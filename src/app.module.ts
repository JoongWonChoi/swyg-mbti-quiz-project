import { Module } from '@nestjs/common';
import { UserCountModule } from './user_count/user_count.module';

@Module({
  imports: [UserCountModule],
})
export class AppModule {}
