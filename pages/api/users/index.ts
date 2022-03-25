import type { NextApiRequest, NextApiResponse } from 'next';
import httpStatus from 'http-status';
import User from '@/modules/users/user.services';
import catchAPIError from '@/modules/errors/catchAPIError';
import connectToDatabase from '@/modules/database/database';

export default catchAPIError(async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { db } = await connectToDatabase();
    const UserCollection = new User(db);

    if (req.method === 'POST') {
        const user = await UserCollection.insertUser(req.body);
        res.status(httpStatus.CREATED).json({ user })
    }
    else if (req.method === 'GET') {
        const docs = await UserCollection.paginate(req.query);
        res.status(httpStatus.OK).json({ results: docs })
    }
    else {
        res.status(httpStatus.NOT_FOUND);
    }
})
