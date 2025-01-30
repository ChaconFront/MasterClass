import { Injectable } from '@nestjs/common';
import { HashingProviders } from './hashing.providers';
import * as bcrypt from 'bcrypt'

@Injectable()
export class BcryptProviders implements HashingProviders{

     public  async hashPassword(data: string | Buffer ): Promise<string> {

        //Generate salt 
        /* Aquí se utiliza la función genSalt() de la biblioteca bcrypt para generar un "salt" (sal).
        Salt: Es un valor aleatorio que se añade a la contraseña antes de hashearla. Esto ayuda a proteger contra 
        ataques de diccionario y fuerza bruta al hacer que cada hash sea único, 
        incluso si la misma contraseña se hashea varias veces. */
        const salt = await bcrypt.genSalt();
       return bcrypt.hash(data,salt)
        
    };

    public async comparePassword(data: string | Buffer, encrypted: string):Promise<boolean>{

       return bcrypt.compare(data,encrypted);
       
    };

}
