import { IsDate, IsOptional } from "class-validator";
import { IntersectionType } from "@nestjs/swagger";
import { PaginationQueryDto } from "src/common/pagination/dto/paginations-query.dto";

class GetPostBaseDto{
    @IsDate()
    @IsOptional()
    startDate?: Date;

    @IsDate()
    @IsOptional()
    endDate?:Date; 
}


//creando un nuevo dto combinando los otros dos.
export class GetPostDto extends IntersectionType(GetPostBaseDto, PaginationQueryDto){

}