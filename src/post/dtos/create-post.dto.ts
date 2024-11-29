import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
} from 'class-validator';
import { PostType } from '../enums/post-type.enum';
import { PostStatus } from '../enums/postStatus.enum';

export class CreatePostDto {
  @IsString()
  @MinLength(4)
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
  feactureImageUrl: string;

  @IsISO8601()
  @IsOptional()
  publishOn: Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags?: string[];

  metaOptions: [{ key: 'sidebarEnabled'; value: true }];
}
