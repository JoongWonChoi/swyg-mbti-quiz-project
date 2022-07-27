import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { quizScoreProviders } from 'src/quiz_score/quiz_score.providers';
import { QuizScoreService } from 'src/quiz_score/quiz_score.service';
import { userCountProviders } from 'src/user_count/user_count.providers';
import { UserCountService } from 'src/user_count/user_count.service';
import { ResultController } from './result.controller';
import { ResultService } from './result.service';

@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [ResultController],
    providers: [UserCountService,
                ResultService,
                QuizScoreService,
                ...userCountProviders,
                ...quizScoreProviders
                ]
})
export class ResultModule {}
