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
import Image from 'next/image';

import { gridSpacing } from '@/modules/themes/Constants';
import colors from 'assets/_themes-vars.module.css';
import pageVisit from '@/public/images/sidebar_icons/page-4.png'
import cart from '@/public/images/sidebar_icons/cart.png'
import newOrder from '@/public/images/sidebar_icons/new-order.png'
import user from '@/public/images/sidebar_icons/user.png'
import login from '@/public/images/sidebar_icons/login.png'

type Props = {}

export default function Display({ }: Props) {

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
                        <TimelineItem>
                            <TimelineOppositeContent sx={{
                                marginLeft: '-90%'
                            }}></TimelineOppositeContent>
                            <TimelineSeparator className='mr-3'>
                                <TimelineDot className='rounded-full bg-[#90caf9] text-black font-bold flex items-center justify-center h-8 w-8 shadow-none'>
                                    <Image src={pageVisit} width={30} height={30} />
                                </TimelineDot>
                                <TimelineConnector className='h-6 bg-[#0090d3] w-1' />
                            </TimelineSeparator>
                            <TimelineContent className='shadow-lg border-l-4 border-l-[#0090d3] flex items-center h-14 mt-3'>
                                <Typography component='span' className='font-bold ml-7'>4:55 am</Typography>
                                <Typography className='font-bold text-base text-black ml-3'>
                                    Page <span className='text-[#0090d3]'>Checkout</span> was visited
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent sx={{
                                marginLeft: '-90%'
                            }}></TimelineOppositeContent>
                            <TimelineSeparator className='mr-3'>
                                <TimelineDot className='rounded-full bg-[#ffcccb] text-black font-bold flex items-center justify-center h-8 w-8 shadow-none'>
                                    <Image src={cart} width={30} height={30} />
                                </TimelineDot>
                                <TimelineConnector className='h-6 bg-[#0090d3] w-1' />
                            </TimelineSeparator>
                            <TimelineContent className='shadow-lg border-l-4 border-l-[#ffcccb] flex items-center h-14 mt-3'>
                                <Typography component='span' className='font-bold ml-7'>4:55 am</Typography>
                                <Typography className='font-bold text-base text-black ml-3'>
                                    <span className='text-[#0090d3]'>Laptop</span> was added to the cart
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent sx={{
                                marginLeft: '-90%'
                            }}></TimelineOppositeContent>
                            <TimelineSeparator className='mr-3'>
                                <TimelineDot className='rounded-full bg-[#ffcccb] text-black font-bold flex items-center justify-center h-8 w-8 shadow-none'>
                                    <Image src={newOrder} width={30} height={30} />
                                </TimelineDot>
                                <TimelineConnector className='h-6 bg-[#0090d3] w-1' />
                            </TimelineSeparator>
                            <TimelineContent className='shadow-lg border-l-4 border-l-[#ffcccb] flex items-center h-14 mt-3'>
                                <Typography component='span' className='font-bold ml-7'>4:55 am</Typography>
                                <Typography className='font-bold text-base text-black ml-3'>
                                    New order in the amount of 40500.00 KES
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent sx={{
                                marginLeft: '-90%'
                            }}></TimelineOppositeContent>
                            <TimelineSeparator className='mr-3'>
                                <TimelineDot className='rounded-full bg-[#b8ea7e] text-black font-bold flex items-center justify-center h-8 w-8 shadow-none'>
                                    <Image src={login} width={30} height={30} />
                                </TimelineDot>
                                <TimelineConnector className='h-6 bg-[#0090d3] w-1' />
                            </TimelineSeparator>
                            <TimelineContent className='shadow-lg border-l-4 border-l-[#b8ea7e] flex items-center h-14 mt-3'>
                                <Typography component='span' className='font-bold ml-7'>4:55 am</Typography>
                                <Typography className='font-bold text-base text-black ml-3'>
                                    Successful login as <span className='text-[#0090d3]'>ryann254</span>
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent sx={{
                                marginLeft: '-90%'
                            }}></TimelineOppositeContent>
                            <TimelineSeparator className='mr-3'>
                                <TimelineDot className='rounded-full bg-[#ffe670] text-black font-bold flex items-center justify-center h-8 w-8 shadow-none'>
                                    <Image src={user} width={30} height={30} />
                                </TimelineDot>
                            </TimelineSeparator>
                            <TimelineContent className='shadow-lg border-l-4 border-l-[#ffe670] flex items-center h-14 mt-3'>
                                <Typography component='span' className='font-bold ml-7'>4:55 am</Typography>
                                <Typography className='font-bold text-base text-black ml-3'>
                                    User identified: keddelyronjoz@gmail.com
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </Grid>
            </Grid>
        </Card>
    )
}