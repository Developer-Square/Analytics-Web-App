import { string } from "joi"

interface postDataParams {
    method: string,
    path: string,
    data: any
}

const sendUserDataToApi = async ({ method, path, data }: postDataParams) => {
    const response = await fetch(path, {
        method,
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

export { sendUserDataToApi }