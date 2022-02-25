import type { NextApiRequest, NextApiResponse } from 'next';
import httpStatus from 'http-status';
import Event from '../../../services/events.services';
import { client } from '../../../lib/mongodb';
import catchAPIError from '../../../lib/catchAPIError';

export default catchAPIError(async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const EventCollection = new Event(client);
    await Event.build();

    if (req.method === 'POST') {
        const event = await EventCollection.insertEvent(req.body);
        res.status(httpStatus.CREATED).json({ event })
    }
    else if (req.method === 'GET') {
        const docs = await EventCollection.paginate(req.body);
        res.status(httpStatus.OK).json({ results: docs })
    }
    else {
        res.status(httpStatus.NOT_FOUND);
    }
})
