import { Inject, Injectable } from "@nestjs/common";
import { ResultDto } from "src/result/dto/result.dto";
import { Repository } from "typeorm";
import { QuizScore } from "./quiz_score.entity";

@Injectable()
export class QuizScoreService{
    constructor(
        @Inject('QUIZSCORE_REPOSITORY')
        private quizScoreRepository: Repository<QuizScore>
    ){}

    //퀴즈 결과 저장하기
    async saveQuizResult(ResultDto: ResultDto): Promise<QuizScore>{
        const quizResult = await this.quizScoreRepository.create({ //QuizScore의 새로운 객체(엔티티) 생성
            userMbti : ResultDto.userMbti,
            quizMbti: ResultDto.quizMbti,
            score : ResultDto.score
        })
        await this.quizScoreRepository.save(quizResult); //퀴즈 결과를 DB에 저장
        return quizResult;
    }

    //(*)통계
    //나와 같은 경우로 퀴즈를 응한 사용자 수
    getSameCaseNum(ResultDto: ResultDto){
        // const same_case_num = this.quizScoreRepository.createQueryBuilder()
        //                         .select("count(*)")
        //                         .from(QuizScore, "quiz_score")
        //                         .where("quiz_score.userMbti = :userMbti and quiz_score.quizMbti = :quizMbti", 
        //                             {userMbti: ResultDto.userMbti, quizMbti : ResultDto.quizMbti});
        // const same_case = this.quizScoreRepository.find({
        //     select: num,
        //     where : {
        //         quizMbti: ResultDto.quizMbti,
        //         userMbti: ResultDto.userMbti
        //     }
        // })
        
        //typeorm querybuilder 사용하여 SQL 작성하기
        const same_case_num = this.quizScoreRepository
                                .createQueryBuilder("quiz_score")
                                .where("quiz_score.userMbti = :userMbti and quiz_score.quizMbti = :quizMbti", 
                                    {userMbti: ResultDto.userMbti, quizMbti : ResultDto.quizMbti}).getCount();
       
        return same_case_num
    }

    //나와 같은 경우로 퀴즈를 응한 사용자들의 평균 점수
    async getSameCaseScore(ResultDto: ResultDto){
        // const same_case_score = this.quizScoreRepository
        //                             .createQueryBuilder("quiz_score")
        //                             .select("quiz_score.score")
        //                             .where("quiz_score.userMbti = :userMbti and quiz_score.quizMbti = :quizMbti", 
        //                             {userMbti: ResultDto.userMbti, quizMbti : ResultDto.quizMbti}).getMany;
        const raws = await this.quizScoreRepository.find({ where : { quizMbti : ResultDto.quizMbti, userMbti : ResultDto.userMbti}});
        var index = 0;
        for(var i=0; i<raws.length; i++){
            index += raws[i].score
        }
        return index / raws.length //평균 점수 구하기
    }

    //quizMbti를 대상으로 퀴즈 진행한 mbti 상위 4개 통계
    async getQuizNumRank(ResultDto: ResultDto){
        //quizMbti에 해당하는 행 모두 뽑기
        var temps = await this.quizScoreRepository.createQueryBuilder('quiz_score')
                                        .groupBy('quiz_score.userMbti')
                                        .having('quiz_score.quizMbti = :quizMbti',
                                        {quizMbti : ResultDto.quizMbti}).getMany()
        //quizMbti를 대상으로 퀴즈를 본 각 mbti 사용자 수 구하기
        console.log(temps)
        const size = temps.length
        var arr: Array<rank> = [];
        for(var i=0; i<size; i++){
            var num = await this.quizScoreRepository
                            .createQueryBuilder("quiz_score")
                            .where("quiz_score.userMbti = :userMbti and quiz_score.quizMbti = :quizMbti", 
                                {userMbti: temps[i].userMbti, quizMbti : ResultDto.quizMbti}).getCount();
            var rank: rank = {
                mbti: temps[i].userMbti,
                num: num
            }
            arr.push(rank);
        }
        //내림차순으로 정렬하기
        arr.sort(
            (first: rank, second: rank) => 
                 (first.num < second.num) ? 1 : -1
        );
        //배열길이 4로 맞추기
        if(arr.length>4){
            while(arr.length>4){
                arr.pop();
            }
        };
        console.log(arr);
        return arr
    }
}