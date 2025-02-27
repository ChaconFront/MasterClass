import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import jwtConfig from '../config/jwt.config';
import { Request } from 'express';
import { REQUEST_USER_KEY } from '../constants/auth.constants';

@Injectable()
export class AccesTokenGuard implements CanActivate {

  constructor( 
    //inject jwtService
    private readonly jwtService:JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration:ConfigType< typeof jwtConfig>
  ){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    
    const request= context.switchToHttp().getRequest();

    const token = this.extracRequestFromHeader(request);

    if(!token){
      throw new UnauthorizedException();
    }

    try {
      const payload= await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration
      )

      request[REQUEST_USER_KEY]=payload;
      
    } catch{
        throw new UnauthorizedException()
    }


    return true;
  }

  private extracRequestFromHeader(request:Request): string | undefined{
    const [type,token]=request.headers.authorization?.split(' ') ??[];
    return type==='Bearer'? token:undefined;
  }

}
