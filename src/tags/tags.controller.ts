import { Body, Controller, Post } from '@nestjs/common';
import { TagsService } from './providers/tags.service';
import { CreateTagsDto } from './dtos/create-tags.dto';

@Controller('tags')
export class TagsController {

constructor(

    private readonly tagService:TagsService,
){}

@Post()
public create(@Body() createTag: CreateTagsDto){

    return this.tagService.createTag(createTag)
}


}
