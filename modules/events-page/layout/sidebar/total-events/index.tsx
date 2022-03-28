import styled from '@emotion/styled'
import NavGroup from './NavGroup'

type Props = {}

export default function TotalEvents({ }: Props) {
    return (
        <>
            <Header className='mt-3'>Total Events</Header>
            {/* TODO: Add a dynamic date */}
            <h6 className='text-sm text-gray-500 mb-3'>From <strong>February 17, 2022</strong> to <strong>March 22, 2022</strong></h6>
            <NavGroup />
        </>
    )
}

const Header = styled.h4`
    font-weight: bold;
`