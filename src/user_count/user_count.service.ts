import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserCount } from "./user_count.entity";

@Injectable()
export class UserCountService{
    constructor(
        @Inject('USERCOUNT_REPOSITORY')
        private userCountRepository : Repository<UserCount>
    ){} //생성자 의존성 주입 :: Repository

    async getQuizUserCount(){ //Type 정해야함
        const numbers = this.userCountRepository.findOne({where : {id : 1}});
        const quiz_num = {"quizUserNum" : (await numbers).quiz};
        return quiz_num;
    }

    async getShareUserCount(){ //Type 정해야함
        const numbers = this.userCountRepository.findOne({where : {id : 1}});
        const share_num = {"shareUserNum" : (await numbers).share};
        return share_num;
    }

}