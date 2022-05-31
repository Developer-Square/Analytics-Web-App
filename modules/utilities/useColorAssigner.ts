import { useCallback } from "react";

const useColorAssigner = (): ((event: string) => string | undefined) => useCallback((event) => {
    if (event.includes('Page') || event.includes('button') || event.includes('search') || event.includes('exit')) {
        return '#2A97D7'
    } else if (event.includes('Cart')) {
        return '#F36959'
    } else if (event.includes('Order') || event.includes('payment')) {
        return '#A24A92'
    } else if (event.includes('login') || event.includes('Login') || event.includes('register') || event.includes('comment')) {
        return '#fcc914'
    }
}, [])

export default useColorAssigner;