import { DataSource } from "typeorm"


//mysql 데이터베이스 연동 설정 파일
export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () =>{
            const dataSource = new DataSource({
                type: 'mysql',
                host: '127.0.0.1',
                port: 3306,
                username: 'root',
                password: '1234',
                database: 'swyg-mbti-quiz',
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: true,
            });

            return dataSource.initialize();
        }

    }
]