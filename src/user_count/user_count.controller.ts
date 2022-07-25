import { Controller, Get } from "@nestjs/common";
import { UserCountService } from "./user_count.service";

@Controller('count')
export class UserCountController{
    constructor(private userCountService: UserCountService){}

    //퀴즈 사용자 수 조회
    @Get('/quiz')
    getQuizUserCount(){
        return this.userCountService.getQuizUserCount();
    }

    //퀴즈 결과 공유 사용자 수 조회
    @Get('/share')
    getShareUserCount(){
        return this.userCountService.getShareUserCount();
    }




}