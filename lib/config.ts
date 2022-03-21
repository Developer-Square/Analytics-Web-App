// import Joi from 'joi';

// const envVarsSchema = Joi.object().keys({
//     NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
//     MONGODB_URI: Joi.string().required().description('Mongo DB uri'),
//     GJS_DEBUG_TOPICS: Joi.required().description('GJS_DEBUG_TOPICS'),
//     LESSOPEN: Joi.required(),
// });

// const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

// if (error) {
//     throw new Error(`Config validation error: ${error.message}`);
// }

const config = {
    env: process.env.NODE_ENV,
    mongodb: {
        url: process.env.MONGODB_URI + (process.env.NODE_ENV === 'test' ? 'test' : ''),
        dbName: process.env.DB_NAME,
    },
    apiKey: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/' : 'http://localhost:3000/api/'
};

export default config;
