import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import { Toaster } from '@/modules/common'
import themes from '@/modules/themes';
import '../styles/globals.css'
import store from '@/modules/redux/app/store';

let persistor = persistStore(store);

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={themes()}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Toaster />
                    <Component {...pageProps} />
                </PersistGate>
            </Provider>
        </ThemeProvider>

    )
}

