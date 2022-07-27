import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserCount } from "./user_count.entity";

@Injectable()
export class UserCountService{
    constructor(
        @Inject('USERCOUNT_REPOSITORY')
        private userCountRepository : Repository<UserCount>
    ){} //생성자 의존성 주입 :: Repository

    //퀴즈 사용자 수 조회
    async getQuizUserCount(){ //Type 정해야함
        const numbers = this.userCountRepository.findOne({where : {id : 1}});
        const quiz_num = {"quizUserNum" : (await numbers).quiz};
        return quiz_num;
    }

    //공유자 수 조회
    async getShareUserCount(): Promise<number>{ 
        const numbers = this.userCountRepository.findOne({where : {id : 1}});
        const share_num = (await numbers).share;
        return share_num;
    }

    //퀴즈 사용자 수 증가
    async addQuizUserCount(): Promise<void>{
        const numbers = await this.userCountRepository.findOne({where : {id : 1}});
        numbers.quiz += 1; //사용자 수 1 증가
        this.userCountRepository.save(numbers); //상태 적용
    }

    //공유자 수 증가
    async addShareUserCount(): Promise<void>{
        const numbers = await this.userCountRepository.findOne({where : {id : 1}});
        numbers.share += 1; //사용자 수 1 증가
        this.userCountRepository.save(numbers); //상태 적용
    }
}