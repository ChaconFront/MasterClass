import { Module, forwardRef } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UserService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersCreate=manyProvider } from './providers/users-create-many.provider';
import profileConfig from './config/profile.config';

@Module({
  controllers: [UsersController],
  providers: [UserService, UsersCreate=manyProvider],
  exports: [UserService],
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User]), ConfigModule.forFeature(profileConfig)], //forwardref es para las dependencias circulares.
})
export class UsersModule {}
