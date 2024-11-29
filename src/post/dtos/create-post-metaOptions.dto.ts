import { IsNotEmpty, IsString } from 'class-validator';

export class MetaOptionsDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsNotEmpty()
  value: any;
}
