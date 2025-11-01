import type { AppProps } from 'next/app';
import Head from 'next/head';
import ReduxProvider from '../store/ReduxProvider';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </ReduxProvider>
  );
}


