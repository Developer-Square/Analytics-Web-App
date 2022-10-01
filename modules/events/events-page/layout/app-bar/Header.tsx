import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Button } from '@mui/material';
import Image from 'next/image';
import Logo from './Logo';
import menuIcon from '@/public/images/imenu-rounded.png';

type Props = {
	open: boolean;
	setOpen: Function;
};

export default function Header({ open, setOpen }: Props) {
	const theme = useTheme();

	return (
		<>
			<Box
				sx={{
					width: 248,
					display: 'flex',
					[theme.breakpoints.down('md')]: {
						width: 'auto',
					},
				}}
			>
				<Box
					component='span'
					sx={{
						display: { xs: 'none', md: 'block' },
						flexGrow: 1,
						marginRight: '15px',
					}}
				>
					<Logo />
				</Box>
				<ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
					<Avatar
						variant='rounded'
						sx={{
							// @ts-ignore
							...theme.typography.commonAvatar,
							// @ts-ignore
							...theme.typography.mediumAvatar,
							transition: 'all .2s ease-in-out',
							background: theme.palette.secondary.light,
							color: theme.palette.secondary.dark,
							'&:hover': {
								background: theme.palette.secondary.dark,
								color: theme.palette.secondary.light,
							},
						}}
						onClick={() => setOpen(!open)}
						color='inherit'
					>
						<Image src={menuIcon} width={25} height={25} alt='image' />
					</Avatar>
				</ButtonBase>
			</Box>
		</>
	);
}
