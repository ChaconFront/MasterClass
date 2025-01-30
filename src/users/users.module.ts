import { Module, forwardRef } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UserService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersCreateManyProvider} from './providers/users-create-many.provider';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import profileConfig from './config/profile.config';

@Module({
  controllers: [UsersController],
  providers: [UserService, UsersCreateManyProvider, CreateUserProvider, FindOneUserByEmailProvider],
  exports: [UserService],
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User]), ConfigModule.forFeature(profileConfig)], //forwardref es para las dependencias circulares.
})
export class UsersModule {}
