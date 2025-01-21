import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dto/create-many-users';

@Injectable()
export class UsersCreateManyProvider {


    constructor (

          /* inyectando data source en el servicio de usuario */
    private readonly  DataSource:DataSource,
    ){}

  public async createMany(createUserManyDto:CreateManyUsersDto){

      let newUsers: User[] = [];
       
      //create query runner Instance
      const queryRunner= this.DataSource.createQueryRunner();
      try {
      //conect query runner datasource
        await queryRunner.connect()

           //start transactions
           await queryRunner.startTransaction()
        
      } catch (error) {
        throw new RequestTimeoutException('could not connect to th database');
      }
   
     
        try {
          for( let user of createUserManyDto.users){
            let newUser= queryRunner.manager.create(User,user);
            let result= await queryRunner.manager.save(newUser);
            newUsers.push(result);
          }
          await queryRunner.commitTransaction();
          
        } catch (error) {
          await queryRunner.rollbackTransaction();
          throw new ConflictException('not complete the transactions',{
            description: String(error)
          });
        }finally{
          try {
            await queryRunner.release()
          } catch (error) {
            throw new RequestTimeoutException('not release the connection',{
              description: String(error)
            });
          }
        
        }
        console.log(newUsers);
        return newUsers;
    }

}
