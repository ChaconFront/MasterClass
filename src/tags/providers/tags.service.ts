import { Injectable } from '@nestjs/common';
import { CreateTagsDto } from '../dtos/create-tags.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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

    /* utiliza el operador In de TypeORM,
     que permite buscar registros cuyos IDs se encuentren dentro del array tags. */
    public async findMultipleTags(tags:number[]){
        const result = await this.tagRepository.find({
         where:{id:In(tags),}   
        })
        return result;
    }
    
    public async delete(id:number){

        await this.tagRepository.delete(id)

        return {
            delete: true,
            id,
        }

    }

    public async softRemove(id:number){
        await this.tagRepository.softDelete(id);
        return {
            delete: true,
            id,
        }

    }


}
