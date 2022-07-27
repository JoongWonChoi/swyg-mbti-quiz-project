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
        // console.log(same_case_num)

        const same_case_num = this.quizScoreRepository
                                .createQueryBuilder("quiz_score")
                                .where("quiz_score.userMbti = :userMbti and quiz_score.quizMbti = :quizMbti", 
                                    {userMbti: ResultDto.userMbti, quizMbti : ResultDto.quizMbti}).getCount();
        //console.log(same_case_num)
        // const same_case = this.quizScoreRepository.find({
        //     select: num,
        //     where : {
        //         quizMbti: ResultDto.quizMbti,
        //         userMbti: ResultDto.userMbti
        //     }
        // })
        return same_case_num
    }

    //나와 같은 경우로 퀴즈를 응한 사용자들의 평균 점수
    async getSameCaseScore(ResultDto: ResultDto){
        // const same_case_score = this.quizScoreRepository
        //                             .createQueryBuilder("quiz_score")
        //                             .select("quiz_score.score")
        //                             .where("quiz_score.userMbti = :userMbti and quiz_score.quizMbti = :quizMbti", 
        //                             {userMbti: ResultDto.userMbti, quizMbti : ResultDto.quizMbti}).getMany;

        const num = this.getSameCaseNum(ResultDto);
        const raws = this.quizScoreRepository.find({ where : { quizMbti : ResultDto.quizMbti, userMbti : ResultDto.userMbti}});
        console.log(raws[0])
        console.log((await raws).length)
        console.log((await raws)
        )
        var index = 0;
        for(var i=0; i<await num; i++){
            index += (await raws).length
        }
        const avgScore = index / await num
        return raws[0]
    }

}