import Head from 'next/head';
import { useRouter } from 'next/router';

import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Nav from '../Nav';
import styles from './index.module.scss';

type Props = {
  children: React.ReactNode;
  section?: string;
  title?: string;
  description?: string;
};

const Container: React.FC<Props> = ({
  children,
  section,
  title = 'takahira - developer',
  description = 'developer | creator | writer',
}) => {
  const router = useRouter();
  const image = 'https://takahira.io/static/images/banner.png';

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>{title}</title>
          <meta content={description} name="description" />
          <meta
            property="og:url"
            content={`https://takahira.io${router.asPath}`}
          />
          <link rel="canonical" href={`https://takahira.io${router.asPath}`} />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="takahira" />
          <meta property="og:description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:image" content={image} />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@tkshrg" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={image} />
          <meta name="theme-color" content="#404040" />
        </Head>
        {section && <Header section={section} />}
        <main>{children}</main>
        <Footer />
      </div>
      <Nav />
    </>
  );
};

export default Container;
