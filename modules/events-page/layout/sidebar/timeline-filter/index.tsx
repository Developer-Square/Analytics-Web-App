import styled from '@emotion/styled'
import Date from './Date'

type Props = {}

export default function TimelineFilter({ }: Props) {
    return (
        <>
            <Header>Timeline Filter</Header>
            <Date />
        </>
    )
}

const Header = styled.h4`
    font-weight: bold;
    margin-bottom: 15px
`