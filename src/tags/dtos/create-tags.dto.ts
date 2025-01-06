import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength } from "class-validator";

export class TagsDto{
    @ApiProperty()
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    @MaxLength(256)
    name:string;
    
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'A slug should be all samll letter and uses only',
      })
    @MaxLength(256)
    slug:string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?:string;


    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    schema?:string;


    @ApiPropertyOptional()
    @IsOptional()
    @IsUrl()
    @MaxLength(1024)
    feacturedImageUrl?:string;


}