import React, { useState } from 'react'

import Display from '@/modules/events-page/layout/main/Display'
import DisplayWrapper from '@/modules/events-page/layout/main/DisplayWrapper'
import SideBarWrapper from '@/modules/events-page/layout/sidebar/SideBarWrapper'
import Sidebar from '@/modules/events-page/layout/sidebar'
import { ErrorBoundary } from '@/modules/helpers/ErrorBoundary'

export default function Events() {
    const [sideBarOpen, setSideBarOpen] = useState(true)

    return (
        <>
            <ErrorBoundary>
                <SideBarWrapper open={sideBarOpen} setOpen={setSideBarOpen}>
                    <Sidebar />
                </SideBarWrapper>
            </ErrorBoundary>
            <ErrorBoundary>
                <DisplayWrapper open={sideBarOpen}>
                    <Display />
                </DisplayWrapper>
            </ErrorBoundary>
        </>
    )
}
