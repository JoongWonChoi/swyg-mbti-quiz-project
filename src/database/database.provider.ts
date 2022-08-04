import { DataSource } from "typeorm"


//mysql 데이터베이스 연동 설정 파일
export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () =>{
            const dataSource = new DataSource({
                type: 'mysql',
                host: 'swyg-mbti-quiz.cfdsahgovhq4.us-west-2.rds.amazonaws.com',
                port: 3306,
                username: 'admin',
                password: 'wnddnjs11',
                database: 'swyg-mbti-quiz',
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: true,
            });

            return dataSource.initialize();
        }

    }
]