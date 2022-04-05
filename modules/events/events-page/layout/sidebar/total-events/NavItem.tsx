import React, { useState } from 'react'
import { ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import Image from 'next/image';

import pageVisit from '@/public/images/sidebar_icons/page-4.png'
import cart from '@/public/images/sidebar_icons/cart.png'
import newOrder from '@/public/images/sidebar_icons/new-order.png'
import user from '@/public/images/sidebar_icons/user.png'
import login from '@/public/images/sidebar_icons/login.png'
import { useAppDispatch, useAppSelector } from '@/modules/redux/app/hooks';
import camelize from '@/modules/utilities/camelize';
import { addPreviousFilter, categoriesFilterAdded, categoriesFilterRemoved } from '@/modules/events/events.multifilter.slice';
import { selectEventTotals } from '@/modules/events/events.slice';
interface NavItemProps {
    title: string,
    index: number
}

export default function NavItem({ title, index }: NavItemProps) {
    const dispatch = useAppDispatch()
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
            <ListItemIcon sx={{ my: 'auto', minWidth: 36 }}>
                {index >= 0 ? <Image src={icons[index]} width={30} height={30} /> : 'loading'}

            </ListItemIcon>
            <ListItemText
                sx={{ fontFamily: 'Inter' }}
                onClick={() => handleClick(title)}
                primary={
                    <Typography color="inherit" className='text-sm'>
                        {title} {Object.keys(eventTotals).length ? eventTotals[camelize(title)] : 0}
                    </Typography>
                }
            >

            </ListItemText>

        </ListItemButton>
    )
}
