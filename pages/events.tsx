import Display from '@/modules/events-page/layout/main/Display'
import Wrapper from '@/modules/events-page/layout/main/wrapper'
import Sidebar from '@/modules/events-page/layout/sidebar'
import { ErrorBoundary } from '@/modules/helpers/ErrorBoundary'
import Head from 'next/head'
import React from 'react'

export default function Events() {
    return (
        <>
            <ErrorBoundary>
                <Sidebar />
            </ErrorBoundary>
            <ErrorBoundary>
                <Wrapper>
                    <Display />
                </Wrapper>
            </ErrorBoundary>
        </>
    )
}
