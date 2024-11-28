import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetUsersParamDto {
  @ApiPropertyOptional({
    description:"Get user with specific id",
    example:1234,
  })//esta propiedad especifica en swagger que este parametro es opcional
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;
}
