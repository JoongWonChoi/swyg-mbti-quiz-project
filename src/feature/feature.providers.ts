import { DataSource } from "typeorm";
import { Feature } from "./feature.entity";

//UserCount Entity가 연동된 DB에 접근할 수 있도록 제공
export const featureProviders = [
    {
        provide: 'FEATURE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Feature),
        inject: ['DATA_SOURCE'],
    }
]