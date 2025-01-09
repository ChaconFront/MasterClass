import { Body, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { MetaOptions } from 'src/meta-options/meta-options.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Post)
    private readonly postRepository:Repository<Post>,
    @InjectRepository(MetaOptions)
    private readonly metaOptionRepository:Repository<MetaOptions>,

    private readonly tagsService:TagsService
  
  ) {}

  public async create(@Body() createPostDto:CreatePostDto){
  //find author from database
    const author= await this.userService.findOneById(createPostDto.authorId)
  //find tags from database
    const tags= await this.tagsService.findMultipleTags(createPostDto.tags)
    const post= this.postRepository.create({...createPostDto,author:author,tags:tags});
   
    return await this.postRepository.save(post);  
}



  public async findAll(userId: string) {
    const post = await this.postRepository.find({ //me vas a traer los post inlcuido su relacion con metaOptions
      relations:{
        metaOptions:true,
        //gracias a la propiedad de las columnas eager true nos ahorramos este codigo de abajo
        //tags:true
        //  author:true,

      }
    })

    return post
  }

  public async update(patchPostDto:PatchPostDto){
    //find tags
    const tags= await this.tagsService.findMultipleTags(patchPostDto.tags);
    //find the post
    const post = await this.postRepository.findOneBy({
        id: patchPostDto.id,
    });

    //updating the properties.
    post.title=patchPostDto.title ?? post.title;
    post.content=patchPostDto.content ?? post.content;
    post.status=patchPostDto.status ?? post.status;
    post.posType=patchPostDto.posType ?? post.posType;
    post.slug=patchPostDto.slug ?? post.slug;
    post.feactureImageUrl=patchPostDto.feactureImageUrl ?? post.feactureImageUrl;
    post.publishOn=patchPostDto.publishOn ?? post.publishOn;

    //asing the mew tags
    post.tags=tags

    return await this.postRepository.save(post)
  }



  public async delete(id:number){
    //find the post 
    const post = await this.postRepository.findOneBy({id});
      if(post) await this.postRepository.delete(id)
    //delete metaOptions
    // await this.metaOptionRepository.delete(post.metaOptions.id) 
    /* const inversePost= await this.metaOptionRepository.find({
      where:{id:post.metaOptions.id},
      relations:{
        post:true,
      }
    })
    console.log(inversePost) */
    //confirmation
    return {delete:true, id}
  }


}
