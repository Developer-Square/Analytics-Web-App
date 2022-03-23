import type { NextApiRequest, NextApiResponse } from 'next';
import httpStatus from 'http-status';
import PageVisit from '../../../services/pageVisits.services';
import catchAPIError from '../../../lib/catchAPIError';
import connectToDatabase from '../../../lib/database';

export default catchAPIError(async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { db } = await connectToDatabase();
    const PageVisitCollection = new PageVisit(db);

    if (req.method === 'POST') {
        const visit = await PageVisitCollection.insertPageVisit(req.body);
        res.status(httpStatus.CREATED).json({ visit })
    }
    else if (req.method === 'GET') {
        const docs = await PageVisitCollection.paginate(req.query);
        res.status(httpStatus.OK).json({ results: docs })
    }
    else {
        res.status(httpStatus.NOT_FOUND);
    }
})
