//npm i joi@17.12.2
import * as Joi from 'joi'

export default Joi.object({
     NODE_ENV: Joi.string().valid('development'),
DATABASE_PORT: Joi.number().port().default(5432),
DATABASE_HOST: Joi.string().required(),
DATABASE_PASSWORD: Joi.string().required(),
DATABASE_SINC: Joi.boolean().required(),
DATABASE_AUTOLOAD: Joi.boolean().required(),
DATABASE_NAME: Joi.string().required(),
PROFILE_API_KEY: Joi.string().required(),
JWT_TOKEN_AUDIENCE: Joi.string().required(),
JWT_TOKEN_ISSUSER: Joi.string().required(),
JWT_ACCESS_TOKEN_TTL: Joi.number().required(),
JWT_SECRET: Joi.string().required(),
})