import type { NextApiRequest, NextApiResponse } from 'next';
import httpStatus from 'http-status';
import { User } from '../../../services/user.services';
import { client } from '../../../lib/mongodb';
import catchAPIError from '../../../lib/catchAPIError';

export default catchAPIError(async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const UserCollection = new User(client);
    await User.build();

    if (req.method === 'POST') {
        const user = await UserCollection.insertUser(req.body);
        res.status(httpStatus.CREATED).json({ user })
    }
    else if (req.method === 'GET') {
        const docs = await UserCollection.paginate(req.body);
        res.status(httpStatus.OK).json({ results: docs })
    }
    else {
        res.status(httpStatus.NOT_FOUND);
    }
})
