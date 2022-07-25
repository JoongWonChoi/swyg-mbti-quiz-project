import { Module } from "@nestjs/common";
import { databaseProviders } from "./database.provider";

//DB사용을 위한 모듈 등록
@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})

export class DatabaseModule {}