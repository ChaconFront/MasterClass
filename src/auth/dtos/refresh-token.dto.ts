import { IsNotEmpty, IsString } from "class-validator";

export class RefreshTokenDto{
    @IsNotEmpty({message: "El refreshToken es Obligatorio"})
    @IsString()
    refreshToken: string
}