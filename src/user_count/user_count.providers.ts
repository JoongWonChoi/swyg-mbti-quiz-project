import { DataSource } from "typeorm";
import { UserCount } from "./user_count.entity";

//UserCount Entity가 연동된 DB에 접근할 수 있도록 제공
export const userCountProviders = [
    {
        provide: 'USERCOUNT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(UserCount),
        inject: ['DATA_SOURCE'],
    }
]