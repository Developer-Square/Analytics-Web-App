import axios from "axios"
interface postDataParams {
    path: string,
    payload: any
}
interface getDataParams {
    path: string
}

export default axios.create({
    headers: {
        "Content-type": "application/json"
    }
})

const sendUserDataToApi = async ({ path, payload }: postDataParams) => {
    const response = await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
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
        if (response.status === 404) {
            throw new Error('Page was not found. Please try again.')
        }
    }
    return response.json()
}

export { sendUserDataToApi, getUserDataFromApi }