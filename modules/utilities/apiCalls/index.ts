import { string } from "joi"

interface postDataParams {
    method: string,
    path: string,
    data: any
}

interface getDataParams {
    method: string,
    path: string
}

interface responsePostData {
    result: {
        acknowledged: boolean,
        insertedId: string
    }
}

const sendUserDataToApi = async ({ method, path, data }: postDataParams): Promise<responsePostData> => {
    const response = await fetch(path, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

const getUserDataFromApi = async ({ method, path }: getDataParams) => {
    const response = await fetch(path, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
    })
    return response.json()
}

export { sendUserDataToApi, getUserDataFromApi }