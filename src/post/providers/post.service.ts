import { BadRequestException, Body, Injectable, RequestTimeoutException } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { MetaOptions } from 'src/meta-options/meta-options.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { GetPostDto } from '../dtos/get-post.dto';
import { PaginationsProvider } from 'src/common/pagination/providers/paginations.provider.ts/paginations.provider.ts';
import { Paginated } from 'src/common/pagination/interfaces/paginate.interface';

@Injectable()
export class PostService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Post)
    private readonly postRepository:Repository<Post>,
    @InjectRepository(MetaOptions)
    private readonly metaOptionRepository:Repository<MetaOptions>,

    private readonly tagsService:TagsService,

    private readonly paginationProvaider: PaginationsProvider
  
  ) {}

  public async create(@Body() createPostDto:CreatePostDto){
  //find author from database
    const authorr= await this.userService.findOneById(createPostDto.authorId)
  //find tags from database
    const tags= await this.tagsService.findMultipleTags(createPostDto.tags)
    const post= this.postRepository.create({
      ...createPostDto,
      tags:tags, 
      //author:authorr
    });
   
    return await this.postRepository.save(post);  
}

/* esta funcion va a retornar un generico de la entidad post en específico */
  public async findAll(userId: string, postQuery:GetPostDto): Promise<Paginated<Post>> {
    const post = await this.paginationProvaider.paginateQuery({
      page: postQuery.page,
      limit: postQuery.limit,
    },this.postRepository)

    return post;
  }



  public async update(patchPostDto:PatchPostDto){
    let tags=undefined;
     let post=undefined;

     try {
        tags= await this.tagsService.findMultipleTags(patchPostDto.tags);
     } catch (error) {
      throw new RequestTimeoutException('unable to process at the moment please try later');
     }
     if(!tags ||tags.length !== patchPostDto.tags.length){
      throw new BadRequestException('pleae check your tag id and ensure they are correct');
     }

     try {
       post = await this.postRepository.findOneBy({
        id: patchPostDto.id,
        }) 
     } catch (error) {
      throw new RequestTimeoutException('unable to process at the moment please try later');
    }  

    if(!post){
      throw new BadRequestException('the postId not exist');
    }
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
    try {
      await this.postRepository.save(post)
    } catch (error) {
      throw new RequestTimeoutException('unable to process at the moment please try later');
    }
    return post;
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
