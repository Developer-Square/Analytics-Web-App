import type { NextApiRequest, NextApiResponse } from 'next';
import httpStatus from 'http-status';
import Event from '../../../services/events.services';
import { client } from '../../../lib/mongodb';
import catchAPIError from '../../../lib/catchAPIError';
import ApiError from '../../../lib/ApiError';
import { ObjectId } from 'bson';

export default catchAPIError(async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const EventCollection = new Event(client);
    await Event.build();
    const { eventId } = req.query;

    if (typeof eventId !== 'string') throw new ApiError(httpStatus.BAD_REQUEST,'ID is invalid');

    if (req.method === 'PATCH') {
        const doc = await EventCollection.update(new ObjectId(eventId), req.body);
        res.status(httpStatus.OK).json({ doc: doc.value });
    }
    else if (req.method === 'GET') {
        const doc = await EventCollection.findById(new ObjectId(eventId));
        res.status(httpStatus.OK).json({ doc });
    }
    else if (req.method === 'DELETE') {
        await EventCollection.deleteEvent(new ObjectId(eventId));
        res.status(httpStatus.NO_CONTENT);
    }
    else {
        res.status(httpStatus.NOT_FOUND);
    }
})
