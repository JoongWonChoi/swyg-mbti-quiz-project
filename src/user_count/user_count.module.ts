import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserCountController } from './user_count.controller';
import { userCountProviders } from './user_count.providers';
import { UserCountService } from './user_count.service';

@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [UserCountController],
    providers: [UserCountService,
    ...userCountProviders], //UserCount Entity가 DB에 접근할 수 있도록 제공하는 파일 등록
})
export class UserCountModule {}
