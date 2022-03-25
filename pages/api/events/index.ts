import type { NextApiRequest, NextApiResponse } from 'next';
import httpStatus from 'http-status';
import Event from '@/modules/events/events.services';
import catchAPIError from '@/modules/errors/catchAPIError';
import connectToDatabase from '@/modules/database/database';

export default catchAPIError(async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { db } = await connectToDatabase();
    const EventCollection = new Event(db);

    if (req.method === 'POST') {
        const event = await EventCollection.insertEvent(req.body);
        res.status(httpStatus.CREATED).json({ event })
    }
    else if (req.method === 'GET') {
        const docs = await EventCollection.paginate(req.query);
        res.status(httpStatus.OK).json({ results: docs })
    }
    else {
        res.status(httpStatus.NOT_FOUND);
    }
})
