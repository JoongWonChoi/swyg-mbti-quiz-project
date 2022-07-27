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
        this.userCountService.addQuizUserCount();
        //요청된 정보들 QuizScore 엔티티에 저장하기
        //this.quizScoreService.saveQuizResult(ResultDto);
        //공유자 수 가져오기
        const shareUserNum = await this.userCountService.getShareUserCount();
        //응답 Body Dto 생성
        const staticDto: StaticDto = {
            quizMbti: ResultDto.quizMbti,
            shareUserNum: shareUserNum
        }
        return staticDto;
    }

    //공유자 수 증가 로직
    addShareUserNum(){
        this.userCountService.addShareUserCount();
        return { "isSuccess" : true };
    }

    //나와 같은 경우로 퀴즈를 응한 사용자 수
    getSameCaseNum(ResultDto: ResultDto){
        //const a = this.quizScoreService.getSameCaseNum(ResultDto);
        const a = this.quizScoreService.getSameCaseScore(ResultDto);
        console.log(a)
        return a
    }

    //나와 같은 경우로 퀴즈를 응한 사용자들의 평균 점수
    getSameCaseScore(){}

}