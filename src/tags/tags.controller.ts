import { Body, Controller, Delete, ParseIntPipe, Post, Query } from '@nestjs/common';
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
/*
particularidades entre sofdelete y delete
delete te elmina los datos de las tabla siempre y  sus relaciones correspondientes siempre 
tengas las relaciones bidirecionales bien

softdelete te elimina los datos pero se quedan vigentes en basedatos o sea solo te pone un timestamp 
de cuando se elmino el dato y no te elimina las relaciones.

*/
@Delete()
public delete(@Query('id', ParseIntPipe) id:number){
    return this.tagService.delete(id)
}

@Delete('sof-delete')
public sofdelete(@Query('id', ParseIntPipe) id:number){
    return this.tagService.softRemove(id)
}



}
