import Display from '@/modules/events-page/layout/Display'
import Sidebar from '@/modules/events-page/layout/sidebar'
import { ErrorBoundary } from '@/modules/helpers/ErrorBoundary'
import Head from 'next/head'
import React from 'react'

export default function Events() {
    return (
        <>
            <ErrorBoundary>
                <Display />
            </ErrorBoundary>
            <ErrorBoundary>
                <Sidebar />
            </ErrorBoundary>
        </>
    )
}
