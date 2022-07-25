import { Inject, Injectable } from "@nestjs/common";
import { Feature } from "./feature.entity";
import { Repository } from "typeorm";

@Injectable()
export class FeatureService{
    constructor(
        @Inject('FEATURE_REPOSITORY')
        private featureRepository: Repository<Feature>
    ){}

    //특정 mbti에 해당하는 특징들 반환
    async getMbtiFeatures(mbti: string): Promise<Feature>{
        return this.featureRepository.findOne( {where : {mbti : mbti}} ); //인자로 넘어온 mbti에 해당하는 행 반환
    }
    
}