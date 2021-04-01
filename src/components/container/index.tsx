import Head from 'next/head';
import { useRouter } from 'next/router';

import React from 'react';
import Header from '../header';
// import Link from 'next/link';

import styles from './index.module.scss';

type Props = {
  children: React.ReactNode;
  title?: string;
  description?: string;
};

const Container: React.FC<Props> = ({
  children,
  title,
  description = 'developer',
}) => {
  const router = useRouter();
  const titleText = title ? `${title} - takahira` : 'takahira - developer';

  return (
    <div className={styles.container}>
      <Head>
        <title>{titleText}</title>
        <meta content={description} name="description" />
        <meta
          property="og:url"
          content={`https://takahira.co${router.asPath}`}
        />
        <link rel="canonical" href={`https://takahira.co${router.asPath}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="takahira" />
        <meta property="og:description" content={description} />
        <meta property="og:title" content={title} />
        <meta
          property="og:image"
          content="https://takahira.io/static/images/banner.png"
        />
      </Head>
      <Header title={title} />
      <main>{children}</main>
    </div>
  );
};

export default Container;
