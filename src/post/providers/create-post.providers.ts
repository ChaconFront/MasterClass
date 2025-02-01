import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UserService } from 'src/users/providers/users.service';
import { TagsService } from 'src/tags/providers/tags.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiveUserInterfaceData } from 'src/auth/interfaces/active-user.interface';

@Injectable()
export class CreatePostProviders {

    constructor(
        @InjectRepository(Post)
        private readonly postRepository:Repository<Post>,
        private readonly userService:UserService,
        private readonly tagsService:TagsService,
    ){};

    public async create(createPostDto:CreatePostDto, user: ActiveUserInterfaceData){
        let author= undefined,
            tags= undefined;
     
        try {
             author = await this.userService.findOneById(user.sub);
            console.log(author)
             tags = await this.tagsService.findMultipleTags(createPostDto.tags);
            console.log(tags)
        } catch (error) {
            throw new ConflictException(error)
        }
       
        /* if(createPostDto.tags.length !== tags.lenght){
            throw new BadRequestException('please check tags Id')
        } */

        const post= this.postRepository.create({
          ...createPostDto,
          tags: tags, 
          author: author,
          
        });
       

        try {
            return await this.postRepository.save(post); 
        } catch (error) {
            
            throw new ConflictException(error,{
                description: "Chequea que no este duplicado el post que deseas guardar"
            })
        }
         
    }
}
