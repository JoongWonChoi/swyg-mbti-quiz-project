import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { FeatureService } from 'src/feature/feature.service';
import { QuizScore } from 'src/quiz_score/quiz_score.entity';
import { UserCountController } from 'src/user_count/user_count.controller';
import { UserCountService } from 'src/user_count/user_count.service';

@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [UserCountController],
    providers: [UserCountService,
                FeatureService,
                QuizScore,
                ]
})
export class ResultModule {}
