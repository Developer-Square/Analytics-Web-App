import React, { ReactNode } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery, Button } from '@mui/material';
import { BrowserView, MobileView } from 'react-device-detect';
import Image from 'next/image';

import logoImage from '@/public/images/logo/Logo_dark_surface.png';

const drawerWidth = 300;

type Props = {
	children: ReactNode;
	open: boolean;
	setOpen: Function;
};

export default function SideBarWrapper({ children, open, setOpen }: Props) {
	const theme = useTheme();
	const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

	const drawer = (
		<>
			<Box sx={{ display: { xs: 'block', md: 'none' } }}>
				<Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
					<Image
						src={logoImage}
						className='rounded-full'
						width={50}
						height={50}
						alt='logo'
					/>
					<p className='font-bold ml-3 my-auto'>TecHive Technologies</p>
					<button
						onClick={() => setOpen(!open)}
						className='btn btn-outline rounded-full w-12 btn-error ml-6'
					>
						X
					</button>
				</Box>
			</Box>
			<BrowserView>{children}</BrowserView>
			<MobileView>
				<Box sx={{ px: 2 }}>{children}</Box>
			</MobileView>
		</>
	);
	return (
		<>
			<Box
				component='nav'
				sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }}
				aria-label='mailbox folders'
			>
				<Drawer
					variant={matchUpMd ? 'persistent' : 'temporary'}
					anchor='left'
					open={open}
					sx={{
						'& .MuiDrawer-paper': {
							width: drawerWidth,
							background: theme.palette.background.default,
							color: theme.palette.text.primary,
							borderRight: 'none',
							[theme.breakpoints.up('md')]: {
								top: '88px',
							},
							marginBottom: '108px',
						},
					}}
					ModalProps={{ keepMounted: true }}
					color='inherit'
				>
					{drawer}
				</Drawer>
			</Box>
		</>
	);
}
