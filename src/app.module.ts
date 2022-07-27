import { Module } from '@nestjs/common';
import { UserCountModule } from './user_count/user_count.module';
import { QuizScoreModule } from './quiz_score/quiz_score.module';
import { ResultModule } from './result/result.module';

@Module({
  imports: [UserCountModule, QuizScoreModule, ResultModule],
})
export class AppModule {}
