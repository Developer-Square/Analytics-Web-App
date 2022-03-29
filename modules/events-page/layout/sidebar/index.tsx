<<<<<<< HEAD:modules/events-page/layout/sidebar/index.tsx
import { ErrorBoundary } from '@/modules/helpers/ErrorBoundary'
import { Divider } from '@mui/material';

import TimelineFilter from './timeline-filter'
import TotalEvents from './total-events'
=======
import { ErrorBoundary } from '@/modules/errors/ErrorBoundary'
import React from 'react'
import TimelineFilter from './TimelineFilter'
import TotalEvents from './TotalEvents'
>>>>>>> b3b4d58238d5552b0ac35c527713901627146fdc:modules/dashboard/components/Sidebar.tsx

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