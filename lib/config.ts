// import Joi from 'joi';

// const envVarsSchema = Joi.object().keys({
//     NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
//     MONGODB_URI: Joi.string().required().description('Mongo DB uri'),
// });

// const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

// if (error) {
//     throw new Error(`Config validation error: ${error.message}`);
// }

const config = {
    env: process.env.NODE_ENV,
    mongoose: {
        url: process.env.MONGODB_URI + (process.env.NODE_ENV === 'test' ? 'test' : ''),
        dbName: process.env.DB_NAME,
    },
};

export default config;