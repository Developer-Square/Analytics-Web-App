import styled from '@emotion/styled'
import Date from './Date'
import Categories from './Categories'
import Action from './Action'

type Props = {}

export default function TimelineFilter({ }: Props) {
    return (
        <>
            <Header>Timeline Filter</Header>
            <Date />
            <Categories />
            <Action />
        </>
    )
}

const Header = styled.h4`
    font-weight: bold;
    margin-bottom: 12px
`