import { getUserDataFromApi } from '@/modules/utilities/apiCalls'
import React from 'react'
import { useQuery } from 'react-query'

type Props = {}

export default function Display({ }: Props) {
    const queryData = {
        method: 'GET',
        path: 'api/users'
    }
    const { data, isLoading, isError, error } = useQuery(['users', queryData], () => getUserDataFromApi(queryData))

    if (isError) {
        alert(error)
        return null
    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            {data}
        </div>
    )
}