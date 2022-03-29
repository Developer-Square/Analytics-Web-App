import { errorHandler } from '@/modules/errors/ErrorHandler';
import axios from "axios"
interface postDataParams {
    path: string,
    data: any
}
interface getDataParams {
    path: string
}

export default axios.create({
    headers: {
        "Content-type": "application/json"
    }
})

const sendUserDataToApi = async ({ path, data }: postDataParams) => {
    const response = await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (!response.ok) {
        errorHandler(response.status)
    }
    return response.json()
}

const getUserDataFromApi = async ({ path }: getDataParams) => {
    const response = await fetch(path, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    if (!response.ok) {
        errorHandler(response.status)
    }
    return response.json()
}

export { sendUserDataToApi, getUserDataFromApi }