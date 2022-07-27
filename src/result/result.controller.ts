import { Body, Controller, Get, Post } from "@nestjs/common";
import { QuizScoreService } from "src/quiz_score/quiz_score.service";
import { UserCountService } from "src/user_count/user_count.service";
import { ResultDto } from "./dto/result.dto";
import { ResultService } from "./result.service";

@Controller('result')
export class ResultController{
    constructor(
        private resultService: ResultService,
        private quizScoreService: QuizScoreService,
    ){}
    
    //결과 페이지 데이터 요청 handler
    @Post()
    saveResult(@Body() ResultDto: ResultDto){
        return this.resultService.showResult(ResultDto);
    }

    //공유기능 handler
    @Post('/share')
    addShareUserNum(){
        return this.resultService.addShareUserNum();
    }

    @Get('/test')
    test(@Body() ResultDto: ResultDto){
        return this.quizScoreService.getSameCaseScore(ResultDto);
    }
}

