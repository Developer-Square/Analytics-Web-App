import type { AppProps } from 'next/app'
import { Toaster } from '@/modules/common'
import '../styles/globals.css'


export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Toaster />
            <Component {...pageProps} />
        </>
    )
}

