import { ErrorBoundary } from '@/modules/helpers/ErrorBoundary'
import React from 'react'
import TimelineFilter from './timeline-filter'
import TotalEvents from './total-events'

type Props = {}

export default function Sidebar({ }: Props) {
    return (
        <>
            <ErrorBoundary>
                <TotalEvents />
            </ErrorBoundary>
            <ErrorBoundary>
                <TimelineFilter />
            </ErrorBoundary>
        </>
    )
}