import { ButtonBase } from '@mui/material';
import Image from 'next/image';
import logoImage from '@/public/images/logo/Logo_dark_surface.png';

type Props = {};

export default function Logo(props: Props) {
	return (
		<>
			<ButtonBase disableRipple>
				<Image
					src={logoImage}
					className='rounded-full'
					width={60}
					height={60}
					alt='logo'
				/>
				<p className='font-bold'>TecHive Technologies</p>
			</ButtonBase>
		</>
	);
}
