import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Head } from 'next/document'
import { Toaster } from '@/modules/common'
import '../styles/globals.css'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            useErrorBoundary: true
        },
    }
})

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Toaster />
                <Component {...pageProps} />
            </QueryClientProvider>
        </>
    )
}

