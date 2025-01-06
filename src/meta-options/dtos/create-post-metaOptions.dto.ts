import { IsJSON, IsNotEmpty } from "class-validator";


export class MetaOptionsDto {
  
  @IsNotEmpty()
  @IsJSON()
  metaValue:JSON;


  
}
