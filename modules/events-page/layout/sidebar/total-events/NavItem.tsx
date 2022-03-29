import React from 'react'
import { ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import Image from 'next/image';

import pageVisit from '@/public/images/sidebar_icons/page-4.png'
import cart from '@/public/images/sidebar_icons/cart.png'
import newOrder from '@/public/images/sidebar_icons/new-order.png'
import user from '@/public/images/sidebar_icons/user.png'
import login from '@/public/images/sidebar_icons/login.png'

interface NavItemProps {
    title: string,
    index: number
}

export default function NavItem({ title, index }: NavItemProps) {
    const icons = [pageVisit, cart, newOrder, user, login]
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
                primary={
                    <Typography color="inherit" className='text-sm'>
                        {title}
                    </Typography>
                }
            >

            </ListItemText>

        </ListItemButton>
    )
}
