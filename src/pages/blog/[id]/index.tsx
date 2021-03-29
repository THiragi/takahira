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
import Image from 'next/image';
import unified from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import CustomLink from '../../../components/customLink';

import { BlogResponse } from '../../../types/blog';
import { getPostData } from '../../../lib/blog';

import styles from './index.module.scss';

type StaticProps = {
  postData: BlogResponse;
  draftKey?: string;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const processor = unified()
  .use(rehypeParse)
  .use(rehypeReact, {
    createElement: React.createElement,
    components: {
      img: Image,
      a: CustomLink,
    },
  });

const Page: NextPage<PageProps> = (props) => {
  const { postData, draftKey } = props;
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
          <Link href={`/api/exit-preview?id=${postData.id}`}>
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
          <h1>{postData.title}</h1>
          <ul>
            <li>publishedAt: {postData.publishedAt}</li>
          </ul>
        </header>
        <article>
          {processor.processSync(postData.body).result as React.ReactElement}
        </article>
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
