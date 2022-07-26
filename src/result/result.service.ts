import { Inject, Injectable } from "@nestjs/common";
import { QuizScoreService } from "src/quiz_score/quiz_score.service";
import { UserCountService } from "src/user_count/user_count.service";
import { Repository } from "typeorm";
import { ResultDto } from "./dto/result.dto";
import { StaticDto } from "./dto/static.dto";

@Injectable()
export class ResultService{
    constructor(
        // @Inject('RESULT_REPOSITORY')
        // private resultRepository: Repository<Result>,
        private userCountService: UserCountService, //UserCount모듈의 UserCountService 의존성 주입
        private quizScoreService: QuizScoreService, //QuizScore 모듈의 QuizScoreService 의존성 주입
    ){}

    //공유자 수 조회
    getShareUserNum(): Promise<number>{
        return this.userCountService.getShareUserCount();
    }

    //결과 응답
    async showResult(ResultDto: ResultDto): Promise<StaticDto>{
        //퀴즈 사용자 수 1 증가
        await this.userCountService.addQuizUserCount();
        //요청된 정보들 QuizScore 엔티티에 저장하기
        await this.quizScoreService.saveQuizResult(ResultDto);
        //공유자 수 가져오기
        const shareUserNum = await this.userCountService.getShareUserCount();
        //나와 같은 경우로 퀴즈를 본 사용자 수 가져오기
        //const same_quiz_num = await this.quizScoreService.getSameCaseNum(ResultDto);
        //나와 같은 경우로 퀴즈를 본 사용자들의 평균 점수 가져오기
        //const same_quiz_avg_score = await this.quizScoreService.getSameCaseScore(ResultDto);
        //내가 응한 quizMbti를 응시한 다른 mbti 수 순위
        const rank = await this.quizScoreService.getQuizNumRank(ResultDto);
        //응답 Body Dto 생성
        const staticDto: StaticDto = {
            quizMbti: ResultDto.quizMbti,
            shareUserNum: shareUserNum,
            //avgScore: same_quiz_avg_score,
            //quizNum: same_quiz_num,
            rank: rank
        }
        return staticDto;
    }

    //공유자 수 증가 로직
    addShareUserNum(){
        this.userCountService.addShareUserCount();
        return { "isSuccess" : true };
    }

}