import type { NextApiRequest, NextApiResponse } from 'next';
import httpStatus from 'http-status';
import { User } from '../../../services/user.services';
import { client } from '../../../lib/mongodb';
import catchAPIError from '../../../lib/catchAPIError';
import ApiError from '../../../lib/ApiError';

export default catchAPIError(async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const UserCollection = new User(client);
    await User.build();
    const { userId } = req.query;

    if (typeof userId !== 'string') throw new ApiError(httpStatus.BAD_REQUEST, 'User ID is invalid');

    if (req.method === 'PATCH') {
        const doc = await UserCollection.update(userId, req.body);
        res.status(httpStatus.OK).json({ doc: doc.value });
    }
    else if (req.method === 'GET') {
        const doc = await UserCollection.findById(userId);
        res.status(httpStatus.OK).json({ results: doc });
    }
    else if (req.method === 'DELETE') {
        await UserCollection.deleteUser(userId);
        res.status(httpStatus.NO_CONTENT);
    }
    else {
        res.status(httpStatus.NOT_FOUND);
    }
})
