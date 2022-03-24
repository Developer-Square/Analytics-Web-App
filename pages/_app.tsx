import type { AppProps } from 'next/app'
import { Toaster } from '@/modules/common'
import '../styles/globals.css'
import { Provider } from 'react-redux';
import store from '@/modules/redux/app/store';


export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Toaster />
            <Component {...pageProps} />
        </Provider>
    )
}

