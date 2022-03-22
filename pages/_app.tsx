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
            {/* <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
            </Head> */}
            <QueryClientProvider client={queryClient}>
                <Toaster />
                <Component {...pageProps} />
            </QueryClientProvider>
        </>
    )
}

