import React from 'react'
import { ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import Image from 'next/image';

import pagevisit from '@/public/images/sidebar_icons/page-1.png'

export default function NavItem() {
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
                <Image src={pagevisit} width={30} height={30} />
            </ListItemIcon>
            <ListItemText
                primary={
                    <Typography variant='body1' color="inherit">
                        Page Visit
                    </Typography>
                }
            >

            </ListItemText>

        </ListItemButton>
    )
}
