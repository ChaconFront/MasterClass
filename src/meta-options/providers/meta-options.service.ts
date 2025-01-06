import { Injectable } from '@nestjs/common';
import { CreateMetaOptionsDto } from '../dtos/create-post-metaOptions.dto';
import { Repository } from 'typeorm';
import { MetaOptions } from '../meta-options.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MetaOptionsService {

constructor(
    /* inject metaOptions Repository */
    @InjectRepository(MetaOptions)
    private readonly  metaOptionsRepository:Repository<MetaOptions>

){}

    public async create(createPostMetaOption: CreateMetaOptionsDto){
const metaOption = this.metaOptionsRepository.create(createPostMetaOption)
return await this.metaOptionsRepository.save(metaOption)

    }
}
