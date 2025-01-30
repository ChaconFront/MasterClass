import { Injectable } from '@nestjs/common';

@Injectable()
export  abstract class HashingProviders {
    
    abstract hashPassword(data: string | Buffer ): Promise<string>;

    abstract comparePassword(data: string | Buffer, encripted: string):Promise<boolean>;


}
