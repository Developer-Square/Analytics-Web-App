import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from '@mui/material/styles';
import { Toaster } from '@/modules/common'
import themes from '../modules/themes';
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
                <ThemeProvider theme={themes()}>
                    <Toaster />
                    <Component {...pageProps} />
                </ThemeProvider>
            </QueryClientProvider>
        </>

    )
}

