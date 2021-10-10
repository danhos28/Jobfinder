import Head from 'next/head';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  title: string;
}

const Layout = (props: LayoutProps) => {
  const { children, title } = props;
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="We find great jobs you'll like so you don't have to search for them. We match you to jobs so you can spend time where it matters the most."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
        <link rel="icon" href="/icon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>
      {children}
    </div>
  );
};

export default Layout;
