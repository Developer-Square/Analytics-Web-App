import { multipleCategoriesRemoved } from '@/modules/events/events.multifilter.slice'
import { eventsPerPageChanged } from '@/modules/events/events.slice'
import { useAppDispatch } from '@/modules/redux/app/hooks'
import React from 'react'

type Props = {}

export default function SortButton({ }: Props) {
    const dispatch = useAppDispatch()

    const handleClick = () => {
        dispatch(multipleCategoriesRemoved())
        dispatch(eventsPerPageChanged(10))
    }
    return (
        <div className='flex'>
            <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-8'>Sort</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={handleClick}>Reset</button>
        </div>
    )
}