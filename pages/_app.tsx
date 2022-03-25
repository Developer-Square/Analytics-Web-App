import type { AppProps } from 'next/app'
import { Toaster } from '@/modules/common'
import '../styles/globals.css'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from '@/modules/redux/app/store';

let persistor = persistStore(store);

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Toaster />
                <Component {...pageProps} />
            </PersistGate>
        </Provider>
    )
}

