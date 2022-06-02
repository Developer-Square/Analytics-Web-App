import { useCallback } from "react";

const useColorAssigner = (): ((event: string) => string | undefined) => useCallback((event) => {
    if (event.includes('Page') || event.includes('button') || event.includes('search') || event.includes('exit')) {
        return 'page'
    } else if (event.includes('Cart')) {
        return 'cart'
    } else if (event.includes('Order') || event.includes('payment')) {
        return 'order'
    } else if (event.includes('login') || event.includes('Login') || event.includes('register') || event.includes('comment') || event.includes('contact')) {
        return 'login'
    }
}, [])

export default useColorAssigner;