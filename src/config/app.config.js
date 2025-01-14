
export const appConfig = () => ({
  environment: process.env,

  database: {
    host: procces.env.DATABASE_HOST || 'localhost',
    port: parseInt(procces.env.DATABASE_PORT) || 5432,
    user: parseInt(procces.env.DATABASE_USER),
    password: parseInt(procces.env.DATABASE_PASSWORD),
    name: parseInt(procces.env.DATABASE_NAME),
    synchronize: procces.env.DATABASE_SINC === 'true' ? true : false,
    autoLoadEntities: procces.env.DATABASE_AUTOLOAD === 'true' ? true : false,
  },
});
