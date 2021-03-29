/* eslint-disable react/no-danger */
import React from 'react';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import Image from 'next/image';

import { BlogResponse } from '../../../types/blog';
import { getPostData } from '../../../lib/blog';

import styles from './index.module.scss';

type StaticProps = {
  blog: BlogResponse;
  draftKey?: string;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = (props) => {
  const { blog, draftKey } = props;
  // const content = hydrate(htmlContent, { components });
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {draftKey && (
        <div>
          現在プレビューモードで閲覧中です。
          <Link href={`/api/exit-preview?id=${blog.id}`}>
            <a>プレビューを解除</a>
          </Link>
        </div>
      )}
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
      </nav>
      <main className={styles.main}>
        <header>
          <h1>{blog.title}</h1>
          <ul>
            <li>publishedAt: {blog.publishedAt}</li>
          </ul>
        </header>
        {blog.body && <article>{blog.body}</article>}
      </main>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => ({
  fallback: 'blocking',
  paths: [],
});

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  const postData = await getPostData(context);

  return {
    props: {
      ...postData,
    },
    revalidate: 120,
  };
};

export default Page;
