/* Solicitud Entrante: Un cliente realiza una solicitud a una ruta de tu aplicación.

Guardia AuthenticationGuard: Intercepta la solicitud antes de llegar al controlador.

Obtención del Tipo de Autenticación:

Utiliza Reflector para obtener los metadatos authType asociados a la ruta o controlador.

Selección del Guardia Apropiado:

Usa authTypeGuardmap para encontrar el guardia correspondiente al authType.

Aplicación del Guardia:

Ejecuta el método canActivate del guardia seleccionado.

Si el guardia devuelve false, la solicitud es rechazada.

Si devuelve true, la solicitud continúa al siguiente paso.

Acceso al Controlador: Si todos los guardias permiten el acceso, la solicitud llega al controlador y se ejecuta el método correspondiente. */
//CanActivate: Determina si una solicitud entrante puede pasar al siguiente 
// paso en el ciclo de manejo de solicitudes (es decir, si puede acceder al controlador).

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AccesTokenGuard } from '../acces-token.guard';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  
  private static readonly defaultAuthType=AuthType.Bearer;

  //este objeto asigna un tipo de autenticacion a su correspondiente guardia
  private readonly authTypeGuardmap:Record<AuthType, CanActivate | CanActivate[]>={
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: {canActivate:()=>true},
  }

  constructor(
    private readonly reflector:Reflector,
    private readonly accessTokenGuard:AccesTokenGuard
  ){}


  async canActivate(context: ExecutionContext,):Promise<boolean>{

      const authTypes=this.reflector.getAllAndOverride(AUTH_TYPE_KEY,[context.getHandler(), context.getClass()]) ?? [AuthenticationGuard.defaultAuthType]
   

    const guard = authTypes.map((type)=>this.authTypeGuardmap[type]).flat()


    const error = new UnauthorizedException();

    for (const instance of guard){
    
      const canActivate= await Promise.resolve(instance.canActivate(context)).catch((err)=>{error:err})
   
      if(canActivate){
        return true;
      }
    }


    throw error;
  }
}
