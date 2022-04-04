import Box from '@mui/material/Box';
import { MiniHeader } from "./Date"
import NavItem from "./NavItem"

type Props = {}

export default function Action({ }: Props) {
    const titlesOnTheLeft = ['Visit Page', 'Search', 'Exit Intent', 'Login', 'Register', 'Comment']
    const titlesOnTheRight = ['New Order', 'Payment', 'Add To Cart', 'Remove From Cart']
    return (
        <>
            <MiniHeader>Actions</MiniHeader>
            {titlesOnTheLeft.length && titlesOnTheLeft.map((title, index) => (
                <Box className='flex'>
                    <NavItem key={index} title={title} />
                    {/* The Math.random is just meant to randomize the keys */}
                    <NavItem key={Math.random() * (20 - 7) + 7} title={titlesOnTheRight[index]} />
                </Box>
            ))
            }
        </>
    )
}