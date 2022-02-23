import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../services/user.services';
import { client } from '../../lib/mongodb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const UserCollection = new User(client);
    await User.build();
    if (req.method === 'POST') {
        const result = await UserCollection.insertUser(req.body);
        res.status(200).json({ result })
    } else if (req.method === 'GET') {
        const docs = await UserCollection.paginate(req.body);
        res.status(200).json({ results: docs })
    }
}