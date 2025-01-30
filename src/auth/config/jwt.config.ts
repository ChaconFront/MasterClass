import { registerAs } from "@nestjs/config"; 

export default registerAs('jwt', ()=>{
    
    return {
        secret: process.env.JWT_SECRET,
        audience:process.env.JWT_TOKEN_AUDIENCE,
        issuser:process.env.JWT_TOKEN_ISSUSER,
        accesTokenTll: parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? '3600',10)
    }
})