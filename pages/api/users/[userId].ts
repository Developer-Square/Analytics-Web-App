import type { NextApiRequest, NextApiResponse } from 'next';
import httpStatus from 'http-status';
import { User } from '../../../services/user.services';
import { client } from '../../../lib/mongodb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const UserCollection = new User(client);
    await User.build();
    const { userId } = req.query;

    if (typeof userId !== 'string') throw new Error('User ID is invalid');

    if (req.method === 'PATCH') {
        const doc = await UserCollection.update(userId, req.body);
        res.status(httpStatus.OK).json({ doc });
    }
    else if (req.method === 'GET') {
        const doc = await UserCollection.findById(userId);
        res.status(httpStatus.OK).json({ results: doc });
    }
    else if (req.method === 'DELETE') {
        const result = await UserCollection.deleteUser(userId);
        res.status(httpStatus.OK).json({ results: result });
    }
    else {
        res.status(httpStatus.NOT_FOUND);
    }
}