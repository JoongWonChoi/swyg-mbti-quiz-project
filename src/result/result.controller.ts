import { Body, Controller, Post } from "@nestjs/common";
import { UserCountService } from "src/user_count/user_count.service";
import { ResultDto } from "./dto/result.dto";
import { ResultService } from "./result.service";

@Controller('result')
export class ResultController{
    constructor(
        private resultService: ResultService,
        private userCountService: UserCountService //UserCount모듈의 UserCountService 의존성 주입
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
}

