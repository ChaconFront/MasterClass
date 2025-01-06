import { Body, Controller, Post } from '@nestjs/common';
import { CreateMetaOptionsDto } from './dtos/create-post-metaOptions.dto';
import { MetaOptionsService } from './providers/meta-options.service';

@Controller('meta-options')
export class MetaOptionsController {

    constructor(
        /* inject service */
        private readonly metaOptionService:MetaOptionsService
    ){}

    @Post()
    public create(@Body() CreatePostMetaOptionsDto:CreateMetaOptionsDto){
        return this.metaOptionService.create(CreatePostMetaOptionsDto)
    }

}
