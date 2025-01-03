import { Module, forwardRef } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UserService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService],
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])], //forwardref es para las dependencias circulares.
})
export class UsersModule {}
