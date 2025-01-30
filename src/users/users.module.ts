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

@Module({
  controllers: [UsersController],
  providers: [UserService, UsersCreateManyProvider, CreateUserProvider, FindOneUserByEmailProvider,
    {//guardia global para la aplicacion.
      provide: APP_GUARD, 
      useClass: AccesTokenGuard
    }],
  exports: [UserService],
  imports: [forwardRef(() => AuthModule), 
    TypeOrmModule.forFeature([User]), 
    ConfigModule.forFeature(profileConfig),
    ConfigModule.forFeature((jwtConfig)),
     JwtModule.registerAsync(jwtConfig.asProvider())
  ],
})
export class UsersModule {}
