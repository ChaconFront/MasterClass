import { registerAs } from "@nestjs/config"; 
import { AuthConfig } from "./auth-config.type";

export default registerAs<AuthConfig>('jwt', ()=>{
    
    return {
        secret: process.env.JWT_SECRET,
        audience:process.env.JWT_TOKEN_AUDIENCE,
        issuser:process.env.JWT_TOKEN_ISSUSER,
        accesTokenTll: parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? '3600',10),
        refreshToken: parseInt(process.env.JWT_REFRESH_TOKEN_TTL ?? '86400',10),
    }
})