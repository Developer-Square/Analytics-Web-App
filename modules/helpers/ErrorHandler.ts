export const errorHandler = (status: number) => {
    if (status === 404) {
        throw new Error('Page not found. Please try again.')
    } else if (status === 400) {
        throw new Error('User already exists.')
    } else {
        throw new Error('Something went wrong. Try refreshing the page')
    }
}