import { TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent, Skeleton } from '@mui/lab'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import React from 'react'

const DisplaySkeleton = () => {
  return (
    <TimelineItem>
        <TimelineOppositeContent
                      sx={{
                        marginLeft: "-90%",
                      }}
                    ></TimelineOppositeContent>
                    <TimelineSeparator className="mr-3">
                    <TimelineDot
                        className={`rounded-full flex items-center justify-center h-8 w-8 !shadow-none`}
                      ></TimelineDot>
                      <TimelineConnector className="h-6 bg-[#0090d3] w-1" />
                    </TimelineSeparator>
                    <TimelineContent>
                        <Skeleton style={{marginTop: '-18px'}} animation='wave' width='100%' height={80}></Skeleton>
                    </TimelineContent>
    </TimelineItem>
  )
}

export default DisplaySkeleton