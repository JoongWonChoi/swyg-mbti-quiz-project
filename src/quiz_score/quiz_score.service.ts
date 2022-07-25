import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { QuizScore } from "./quiz_score.entity";

@Injectable()
export class QuizScoreService{
    constructor(
        @Inject('QUIZSCORE_REPOSITORY')
        private quizScoreRepository: Repository<QuizScore>
    ){}

    //퀴즈 결과 저장하기
    async saveQuizResult(userMbti:string, quizMbti:string, score:number): Promise<QuizScore>{
        const quizResult = await this.quizScoreRepository.create({ //QuizScore의 새로운 객체(엔티티) 생성
            userMbti : userMbti,
            quizMbti: quizMbti,
            score : score
        })
        await this.quizScoreRepository.save(quizResult); //퀴즈 결과를 DB에 저장
        return quizResult;
    }

    //통계

}