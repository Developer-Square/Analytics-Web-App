import { ButtonBase } from '@mui/material';
import Image from 'next/image';
import logoImage from '@/public/images/logo/Logo - dark surface.png'

type Props = {}

export default function Logo(props: Props) {
    return (
        <>
            <ButtonBase disableRipple>
                <Image src={logoImage} className='rounded-full' width={60} height={60} />
                <p className='font-bold'>TecHive Technologies</p>
            </ButtonBase>
        </>
    )
}