import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { quizScoreProviders } from './quiz_score.providers';
import { QuizScoreService } from './quiz_score.service';

@Module({
    imports: [
        DatabaseModule
    ],
    providers: [QuizScoreService,
    ...quizScoreProviders],
})
export class QuizScoreModule {}




