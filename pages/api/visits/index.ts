import type { NextApiRequest, NextApiResponse } from 'next';
import httpStatus from 'http-status';
import PageVisit from '../../../services/pageVisits.services';
import { client } from '../../../lib/mongodb';
import catchAPIError from '../../../lib/catchAPIError';

export default catchAPIError(async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const PageVisitCollection = new PageVisit(client);
    await PageVisit.build();

    if (req.method === 'POST') {
        const visit = await PageVisitCollection.insertPageVisit(req.body);
        res.status(httpStatus.CREATED).json({ visit })
    }
    else if (req.method === 'GET') {
        const docs = await PageVisitCollection.paginate(req.body);
        res.status(httpStatus.OK).json({ results: docs })
    }
    else {
        res.status(httpStatus.NOT_FOUND);
    }
})
