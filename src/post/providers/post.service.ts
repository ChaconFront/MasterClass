import { Body, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { MetaOptions } from 'src/meta-options/meta-options.entity';

@Injectable()
export class PostService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Post)
    private readonly postRepository:Repository<Post>,
    @InjectRepository(MetaOptions)
    private readonly metaOptionRepository:Repository<MetaOptions>
  
  ) {}



  public async create(@Body() createPostDto:CreatePostDto){
  /*  const metaOptions= createPostDto.metaOptions 
        ? this.metaOptionRepository.create(createPostDto.metaOptions)
        :null
  
      if(metaOptions){
        await this.metaOptionRepository.save(metaOptions)
      }  */
    const post=await this.postRepository.create(createPostDto);
   /*    if(metaOptions){
        post.metaOptions=metaOptions;
      } 
 */
      console.log(post)
    return await this.postRepository.save(post);  
}






  public async findAll(userId: string) {
    const user = this.userService.findOneById(userId);
    const post = await this.postRepository.find({ //me vas a traer los post inlcuido su relacion con metaOptions
      relations:{
        metaOptions:true
      }
    })
    console.log(user);
    return post
  }
}
