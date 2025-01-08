import {
  IsArray,
  IsEnum,
  IsInt,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PostType } from '../enums/post-type.enum';
import { PostStatus } from '../enums/postStatus.enum';
import { CreateMetaOptionsDto } from '../../meta-options/dtos/create-post-metaOptions.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreatePostDto {
  @ApiProperty({
    example: 'this is a title',
    description: 'this is post',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(512)
  @IsNotEmpty()
  title: string;

  @IsEnum(PostType)
  @IsNotEmpty()
  posType: PostType;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'A slug should be all samll letter and uses only',
  })
  @MaxLength(256)
  slug: string;

  @IsEnum(PostStatus)
  @IsNotEmpty()
  status: PostStatus;

  @IsString()
  @IsOptional()
  content?: string;

  @IsOptional()
  @IsJSON()
  schema?: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(1024)
  feactureImageUrl: string;

  @IsISO8601()
  @IsOptional()
  publishOn: Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags?: string[];


  @ApiPropertyOptional({
    type:'array',
    required:false,
    items:{
      type:'object',
      properties:{
        metavalue:{
          type:'json',
          description:'the metavalue is a JSON string',
          example:'{"SidebarEnable":true}'
        }
      }
    }
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateMetaOptionsDto)
  metaOptions: CreateMetaOptionsDto | null;


  @ApiProperty({
    type:'integer',
    required:true,
    example:1
  })
  @IsNotEmpty()
  @IsInt()
  authorId:number;
}
