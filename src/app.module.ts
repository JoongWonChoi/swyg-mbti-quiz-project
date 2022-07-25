import { Module } from '@nestjs/common';
import { UserCountModule } from './user_count/user_count.module';
import { FeatureModule } from './feature/feature.module';
import { QuizScoreModule } from './quiz_score/quiz_score.module';
import { ResultModule } from './result/result.module';

@Module({
  imports: [UserCountModule, FeatureModule, QuizScoreModule, ResultModule],
})
export class AppModule {}
