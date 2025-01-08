import { Injectable } from '@nestjs/common';
import { CreateTagsDto } from '../dtos/create-tags.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tags } from '../tags.entity';

@Injectable()
export class TagsService {

constructor(
    @InjectRepository(Tags)
    private readonly tagRepository:Repository<Tags>
){}

    public async createTag(createTagDto: CreateTagsDto){
        const tag= this.tagRepository.create(createTagDto);

        return await this.tagRepository.save(tag);
    }


    
}
