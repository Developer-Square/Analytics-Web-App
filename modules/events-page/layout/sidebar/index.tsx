import { ErrorBoundary } from '@/modules/helpers/ErrorBoundary'
import { Divider } from '@mui/material';

import TimelineFilter from './timeline-filter'
import TotalEvents from './total-events'

type Props = {}

export default function Sidebar({ }: Props) {
    return (
        <div className='md:mb-28 px-4'>
            <ErrorBoundary>
                <TotalEvents />
            </ErrorBoundary>
            {/* group divider */}
            <Divider sx={{ mt: 0.25, mb: 1.25 }} />
            <ErrorBoundary>
                <TimelineFilter />
            </ErrorBoundary>
        </div>
    )
}