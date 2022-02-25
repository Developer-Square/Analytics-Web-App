import { ErrorBoundary } from '@/modules/helpers/ErrorBoundary'
import React from 'react'
import TimelineFilter from './TimelineFilter'
import TotalEvents from './TotalEvents'

type Props = {}

export default function Sidebar({ }: Props) {
    return (
        <div>
            <ErrorBoundary>
                <TimelineFilter />
            </ErrorBoundary>
            <ErrorBoundary>
                <TotalEvents />
            </ErrorBoundary>
        </div>
    )
}