import { multipleCategoriesRemoved } from '@/modules/events/events.multifilter.slice'
import { eventsPerPageChanged } from '@/modules/events/events.slice'
import { useAppDispatch } from '@/modules/redux/app/hooks'

type Props = {}

export default function ResetButton({ }: Props) {
    const dispatch = useAppDispatch()

    const handleReset = () => {
        dispatch(multipleCategoriesRemoved())
        dispatch(eventsPerPageChanged(10))
    }
    return (
        <div className='flex mt-8'>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={handleReset}>Reset</button>
        </div>
    )
}