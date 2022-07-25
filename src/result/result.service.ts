import { Injectable } from "@nestjs/common";
import { FeatureService } from "src/feature/feature.service";
import { QuizScoreService } from "src/quiz_score/quiz_score.service";
import { UserCountService } from "src/user_count/user_count.service";

@Injectable()
export class ResultService{
    constructor(
        userCountService: UserCountService, //UserCount모듈의 UserCountService 의존성 주입
        quizScoreService: QuizScoreService, //QuizScore 모듈의 QuizScoreService 의존성 주입
        featureService: FeatureService, //Feature 모듈의 Feature 의존성 주입 
    ){}

}