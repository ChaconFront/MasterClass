//npm i joi@17.12.2
import * as Joi from 'joi'

export default Joi.object({
     NODE_ENV: Joi.string().valid('development'),
DATABASE_PORT: Joi.number().port().default(5432),
DATABASE_HOST: Joi.string().required(),
DATABASE_PASSWORD:Joi.string().required(),
DATABASE_NAME:Joi.string().required(),
PROFILE_API_KEY: Joi.string().required()

})