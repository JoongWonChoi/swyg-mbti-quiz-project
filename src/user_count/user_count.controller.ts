import { Controller, Get } from "@nestjs/common";
import { UserCountService } from "./user_count.service";

@Controller()
export class UserCountController{
    constructor(private userCountService: UserCountService){}

    //퀴즈 사용자 수 조회 handler
    @Get('/main')
    getQuizUserCount(){
        return this.userCountService.getQuizUserCount();
    }
}