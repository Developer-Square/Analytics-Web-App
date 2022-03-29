import styled from '@emotion/styled'
import Date from './Date'
import Categories from './Categories'
import Action from './Action'
import Display from './Display'
import SortButton from './SortButton'

type Props = {}

export default function TimelineFilter({ }: Props) {
    return (
        <>
            <Header>Timeline Filter</Header>
            <Date />
            <Categories />
            <Action />
            <Display />
            <SortButton />
        </>
    )
}

const Header = styled.h4`
    font-weight: bold;
    margin-bottom: 12px
`