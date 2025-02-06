import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class GoogleTokenDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly token: string;
}