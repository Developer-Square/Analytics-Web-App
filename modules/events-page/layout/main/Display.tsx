import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Button from '@mui/material/Button';
import Image from 'next/image';
import { ReactNode } from 'react';

import { gridSpacing } from '@/modules/themes/Constants';
import colors from 'assets/_themes-vars.module.css';
import pageVisit from '@/public/images/sidebar_icons/page-4.png'
import cart from '@/public/images/sidebar_icons/cart.png'
import newOrder from '@/public/images/sidebar_icons/new-order.png'
import user from '@/public/images/sidebar_icons/user.png'
import login from '@/public/images/sidebar_icons/login.png'

type Props = {}

interface displayEvents {
    color: string,
    image: StaticImageData,
    time: string,
    span: ReactNode,
}

export default function Display({ }: Props) {
    const events = [
        {
            color: '#90caf9',
            image: pageVisit,
            time: '4:55am',
            span: <>Page <span className='text-[#0090d3]'>Checkout</span> was visited</>,
        },
        {
            color: '#ffcccb',
            image: cart,
            time: '8:43pm',
            span: <><span className='text-[#0090d3]'>Laptop</span> was added to cart</>,
        },
        {
            color: '#ffcccb',
            image: newOrder,
            time: '11:43am',
            span: <>New order in the amount of 40500.00 KES</>,
        },
        {
            color: '#b8ea7e',
            image: login,
            time: '6:13pm',
            span: <>Successful login as <span className='text-[#0090d3]'>ryann254</span></>,
        },
        {
            color: '#ffe670',
            image: user,
            time: '3:01pm',
            span: <>User identified: keddelyronjoz@gmail.com</>,
        },
    ] as displayEvents[]
    return (
        <Card sx={{
            border: '1px solid',
            borderColor: colors.primary200 + 75,
            ':hover': {
                boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)'
            },
        }}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Timeline>
                        <TimelineItem>
                            <TimelineOppositeContent sx={{
                                marginLeft: '-90%'
                            }}></TimelineOppositeContent>
                            <TimelineSeparator className='mr-3'>
                                <TimelineDot className='rounded-full bg-white shadow-none border-3 border-[#0090d3] h-12 w-12 flex items-center justify-center'>
                                    <Typography className='text-sm font-bold text-black'>2022</Typography>
                                </TimelineDot>
                                <TimelineConnector className='h-6 bg-[#0090d3] w-1' />
                            </TimelineSeparator>
                            <TimelineContent></TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent sx={{
                                marginLeft: '-90%'
                            }}></TimelineOppositeContent>
                            <TimelineSeparator className='mr-3'>
                                <TimelineDot className='rounded-full bg-white h-5 w-5 shadow-none border-3 border-[#0090d3]'>
                                </TimelineDot>
                                <TimelineConnector className='h-14 bg-[#0090d3] w-1' />
                            </TimelineSeparator>
                            <TimelineContent className='bg-[#0090d3] h-10 flex items-center'>
                                <Typography className='font-bold text-base uppercase text-white ml-8'>
                                    March 2022
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent sx={{
                                marginLeft: '-90%'
                            }}></TimelineOppositeContent>
                            <TimelineSeparator className='mr-3'>
                                <TimelineDot className='rounded-full bg-white text-black font-bold flex items-center justify-center h-10 w-10 shadow-none border-3 border-[#0090d3]'>
                                    28
                                </TimelineDot>
                                <TimelineConnector className='h-6 bg-[#0090d3] w-1' />
                            </TimelineSeparator>
                            <TimelineContent className='bg-white flex items-center h-10 mt-3'>
                                <Typography className='font-bold text-base uppercase text-black ml-7'>
                                    Monday, 28.03.2022
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>
                        {/* Information */}
                        {events.length && events.map((event, index) => (
                            <TimelineItem key={index}>
                                <TimelineOppositeContent sx={{
                                    marginLeft: '-90%'
                                }}></TimelineOppositeContent>
                                <TimelineSeparator className='mr-3'>
                                    <TimelineDot className={`rounded-full bg-[${event.color}] text-black font-bold flex items-center justify-center h-8 w-8 shadow-none`}>
                                        <Image src={event.image} width={30} height={30} />
                                    </TimelineDot>
                                    <TimelineConnector className='h-6 bg-[#0090d3] w-1' />
                                </TimelineSeparator>
                                <TimelineContent className={`shadow-lg border-l-4 border-l-[${event.color}] flex items-center h-14 group mt-3`}>
                                    <Typography component='span' className='font-bold ml-7'>{event.time}</Typography>
                                    <Typography className='font-bold text-base text-black ml-3'>
                                        {event.span}
                                    </Typography>
                                    <Button className='shadow-none bg-[#e55444] text-white h-8 ml-auto hidden group-hover:block cursor-pointer hover:bg-[#ffcccb]'>Delete</Button>
                                </TimelineContent>
                            </TimelineItem>
                        ))}
                    </Timeline>
                </Grid>
            </Grid>
        </Card>
    )
}