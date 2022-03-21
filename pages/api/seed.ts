import type { NextApiRequest, NextApiResponse } from 'next';
import catchAPIError from '../../lib/catchAPIError';
import seed from '../../lib/populate';
import config from '../../lib/config';

export default catchAPIError(async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    if(config.env !== 'development'){
        res.status(404).end();
    }
    else if(req.method === 'POST'){
        const result = await seed();
        res.status(200).json({ result });
    }
    else {
        res.status(404).end();
    }
})