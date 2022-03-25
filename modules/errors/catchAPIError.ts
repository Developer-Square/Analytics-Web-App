import type { NextApiRequest, NextApiResponse } from 'next';
import ApiError from './ApiError';
import { MongoError, WriteConcernError, WriteError } from 'mongodb';
import httpStatus from 'http-status';
import config from '../config/config';
import logger from '../config/logger';

export const errorConverter = (error: any) : ApiError => {
    if(error instanceof ApiError) return error;
    const statusCode = error.statusCode || error instanceof MongoError ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message: string = error.message || error instanceof WriteError ? error.errmsg : error instanceof WriteConcernError ? error.errmsg :`${httpStatus[statusCode]}`;
    return new ApiError(statusCode, message, false, error.stack);
}

const catchAPIError = (handler: Function) => async (req: NextApiRequest, res: NextApiResponse) => handler(req, res).catch((error: any) => {
    let convertedError: ApiError = errorConverter(error);
    if (config.env === 'production' && !convertedError.isOperational){
        convertedError.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        convertedError.message = `${httpStatus[httpStatus.INTERNAL_SERVER_ERROR]}`;
    }
    const response = {
        code: convertedError.statusCode,
        message: convertedError.message,
        ...(config.env === 'development' && { stack: convertedError.stack }),
    };
    if (config.env === 'development') {
        logger.error(convertedError);
    }
    res.status(convertedError.statusCode).send(response);
})

export default catchAPIError;
