import type { NextApiRequest, NextApiResponse } from 'next';
import httpStatus from 'http-status';
import Event from '../../../services/events.services';
import catchAPIError from '../../../lib/catchAPIError';
import connectToDatabase from '../../../lib/database';

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
