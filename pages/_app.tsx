import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import ContextWrapper from '../components/ContextWrapper';

function MyApp({ Component, pageProps }: AppProps) {
  const loginStatus = false;

  return (
    <ContextWrapper loginStatus={loginStatus}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <Component {...pageProps} />
    </ContextWrapper>
  );
}
export default MyApp;
