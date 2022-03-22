import React from 'react'
import { useQuery } from 'react-query'
import { getUserDataFromApi } from '@/modules/utilities/apiCalls'
import { toast } from '@/modules/common'

type Props = {}

export default function Display({ }: Props) {
    const queryData = {
        path: 'api/users'
    }
    const { data, isLoading, isError, isSuccess, error, status } = useQuery(['users', queryData], () => getUserDataFromApi(queryData), { retry: 3 })

    if (isSuccess) {
        toast.success('Latest user fetched successfully.');
    }

    if (isError) {
        toast.error(`${error}`);
        return null
    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            {data.results ? <div>Created userId is: <strong>{data.results[data.results.length - 1]._id}</strong></div> : null}
        </div>
    )
}