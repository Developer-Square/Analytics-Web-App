import React from 'react'
import { ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import styled from '@emotion/styled'
import Image from 'next/image';

import pageVisit from '@/public/images/sidebar_icons/web-design.png'
import cart from '@/public/images/sidebar_icons/buy.png'
import newOrder from '@/public/images/sidebar_icons/order-history.png'
import login from '@/public/images/sidebar_icons/password.png'
import { useAppDispatch, useAppSelector } from '@/modules/redux/app/hooks';
import camelize from '@/modules/utilities/camelize';
import { addPreviousFilter, categoriesFilterAdded, categoriesFilterRemoved } from '@/modules/events/events.multifilter.slice';
import { selectEventTotals } from '@/modules/events/events.slice';
import useColorAssigner from '@/modules/utilities/useColorAssigner';
import { Border } from '../../../Display';
interface NavItemProps {
    title: string,
    index: number
}

export default function NavItem({ title, index }: NavItemProps) {
    const dispatch = useAppDispatch()
    const assignColor = useColorAssigner()
    const eventTotals = useAppSelector(selectEventTotals)
    const previousFilter = useAppSelector(state => state.eventsMultipleFilters.previousFilter)
    const icons = [pageVisit, cart, newOrder, login]


    const handleClick = (title: string) => {
        const result = camelize(title)
        // When a user had previously clicked on a sidebar item like 'Visit Page' and now they
        // want to view 'Add to Cart' events, we should first get rid of the 'Visit Page' events.
        if (previousFilter) {
            dispatch(categoriesFilterRemoved(previousFilter))
        }
        dispatch(categoriesFilterAdded(result))
        dispatch(addPreviousFilter(result))
    }

    return (
        <Border>
        <ListItemButton
            sx={{
                borderRadius: '12px',
                mb: 0.5,
                alignItems: 'flex-start',
                backgroundColor: 'inherit',
                py: 1.25,
                pl: '24px'
            }}
        >
            <ListItemIcon sx={{ my: 'auto', minWidth: 36, height: '34px' }} className={`rounded-full flex items-center justify-center ${assignColor(title)}`}>
                {index >= 0 ? <IconImage><Image src={icons[index]} width={30} height={30} /></IconImage> : 'loading'}

            </ListItemIcon>
            <ListItemText
                sx={{ fontFamily: 'Inter', marginLeft: '8px' }}
                onClick={() => handleClick(title)}
                primary={
                    <Typography color="inherit" className='text-sm'>
                        {title} <span className='font-bold'>{Object.keys(eventTotals).length ? `(${eventTotals[camelize(title)] ? eventTotals[camelize(title)] : 0})` : 0}</span>
                    </Typography>
                }
            >

            </ListItemText>

        </ListItemButton>
        </Border>
    )
}


const IconImage = styled.div`
    img {
        padding-top: 3px !important;
        padding-left: 3px !important;
        padding-right: 3px !important;
        padding-bottom: 0 !important;
    }
`