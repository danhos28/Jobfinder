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
        <link rel="icon" href="/icon.ico" />
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
