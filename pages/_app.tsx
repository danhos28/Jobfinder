import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import ContextWrapper from '../components/ContextWrapper';

function MyApp({ Component, pageProps }: AppProps) {
  const loginStatus = false;

  return (
    <ContextWrapper loginStatus={loginStatus}>
      <Component {...pageProps} />
    </ContextWrapper>
  );
}
export default MyApp;
