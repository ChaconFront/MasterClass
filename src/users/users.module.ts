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
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/auth/config/jwt.config';
import { APP_GUARD } from '@nestjs/core';
import { AccesTokenGuard } from 'src/auth/guards/acces-token.guard';
import { FindOneByGoogleIdProvider } from './providers/find-one-by-google-id.provider';
import { CreateGoogleProviders } from './providers/create-google.providers';

@Module({
  controllers: [UsersController],
  providers: [UserService, UsersCreateManyProvider, CreateUserProvider, FindOneUserByEmailProvider, FindOneByGoogleIdProvider, CreateGoogleProviders,
    ],
  exports: [UserService],
  imports: [forwardRef(() => AuthModule), 
    TypeOrmModule.forFeature([User]), 
    ConfigModule.forFeature(profileConfig),
  ],
})
export class UsersModule {}
