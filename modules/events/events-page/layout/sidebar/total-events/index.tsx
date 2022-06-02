import styled from '@emotion/styled'

import { useAppSelector } from '@/modules/redux/app/hooks';
import NavGroup from './NavGroup'
import { selectFinalDate, selectInitialDate } from '@/modules/redux/universalReducers/dateFilter.slice';
import useSetDate from '@/modules/utilities/useSetDate';
import useToMonthName from '@/modules/utilities/useToMonthName';

type Props = {}

export default function TotalEvents({ }: Props) {
    const initialDate = useAppSelector(selectInitialDate);
    const finalDate = useAppSelector(selectFinalDate);
    const setDate = useSetDate()
    const toMonthName = useToMonthName()

    const setDateString = (type: string): string => {
        if (type === 'initial') {
            return `${toMonthName(setDate(initialDate, 'month'))} ${setDate(initialDate, 'day')},${setDate(initialDate, 'year')}`
        } else {
            return `${toMonthName(setDate(finalDate, 'month'))} ${setDate(finalDate, 'day')},${setDate(finalDate, 'year')}`
        }
    }
    return (
        <>
            <Header className='mt-3'>Total Events</Header>
            {/* TODO: Add a dynamic date */}
            <h6 className='text-sm text-gray-500 mb-3'>From <strong>{initialDate ? setDateString('initial') : ''}</strong> to <strong>{finalDate ? setDateString('final') : ''}</strong></h6>
            <NavGroup />
        </>
    )
}

const Header = styled.h4`
    font-weight: bold;
`