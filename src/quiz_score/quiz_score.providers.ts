import { DataSource } from "typeorm";
import { QuizScore } from "./quiz_score.entity";

//QuizScore Entity가 연동된 DB에 접근할 수 있도록 제공
export const quizScoreProviders = [
    {
        provide: 'QUIZSCORE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(QuizScore),
        inject: ['DATA_SOURCE'],
    }
]