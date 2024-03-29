import React, { ReactNode } from 'react';
import { styled, useTheme, Theme } from '@mui/material/styles';
import { isMobile } from 'react-device-detect';

const drawerWidth = 300;

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }: { theme: Theme; open: boolean }) => ({
		// @ts-ignore
		...theme.typography.mainContent,
		...(!open && {
			borderBottomLeftRadius: 0,
			borderBottomRightRadius: 0,
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			[theme.breakpoints.up('md')]: {
				marginLeft: -(drawerWidth - 20),
				width: `calc(100% - ${drawerWidth}px)`,
			},
			[theme.breakpoints.down('md')]: {
				marginLeft: '20px',
				width: `calc(100% - ${drawerWidth}px)`,
				padding: '16px',
			},
			[theme.breakpoints.down('sm')]: {
				marginLeft: '10px',
				width: `calc(100% - ${drawerWidth}px)`,
				padding: '16px',
				marginRight: '10px',
			},
		}),
		...(open && {
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: 0,
			borderBottomLeftRadius: 0,
			borderBottomRightRadius: 0,
			width: `calc(100% - ${drawerWidth}px)`,
			[theme.breakpoints.down('md')]: {
				marginLeft: '20px',
			},
			[theme.breakpoints.down('sm')]: {
				marginLeft: '10px',
			},
		}),
	})
);

type Props = {
	children: ReactNode;
	open: boolean;
	setOpen: Function;
};

export default function DisplayWrapper({ children, open, setOpen }: Props) {
	const theme = useTheme();
	return (
		<>
			<Main
				theme={theme}
				open={open}
				onClick={isMobile ? setOpen(true) : () => {}}
			>
				{children}
			</Main>
		</>
	);
}
