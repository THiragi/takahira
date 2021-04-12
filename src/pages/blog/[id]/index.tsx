/* eslint-disable react/no-danger */
import React from 'react';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import Link from 'next/link';
import Image from 'next/image';
import unified from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import { getPostData } from '../../../lib/blog';
import Container from '../../../components/container';
import CustomLink from '../../../components/customLink';
import Date from '../../../components/date';
import ShareLinks from '../../../components/shareLinks';
import { BlogResponse } from '../../../types/blog';

import styles from './index.module.scss';

type StaticProps = {
  postData: BlogResponse;
  draftKey?: string;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const processor = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeReact, {
    createElement: React.createElement,
    components: {
      img: Image,
      a: CustomLink,
    },
  });

const Page: NextPage<PageProps> = (props) => {
  const { postData, draftKey } = props;

  return (
    <>
      {draftKey && (
        <div className={styles.preview}>
          <div className={styles.nav}>
            <div>プレビューを表示中</div>
            <Link href={`/api/exit-preview?id=${postData.id}`}>
              <a>プレビュー解除</a>
            </Link>
          </div>
        </div>
      )}
      <Container
        section="blog"
        title={`${postData.title} - takahira`}
        description={postData.excerpt}
      >
        <h1>{postData.title}</h1>
        <Date dateString={postData.publishedAt} />
        <article className={styles.content}>
          {processor.processSync(postData.body).result as React.ReactElement}
        </article>
        <ShareLinks id={postData.id} title={postData.title} />
        <div className={styles.toIndex}>
          <Link
            href={draftKey ? `/api/exit-preview?id=${postData.id}` : '/blog'}
          >
            <a>blog一覧へ戻る</a>
          </Link>
        </div>
      </Container>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
});

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  const postData = await getPostData(context);

  return {
    props: {
      ...postData,
    },
    revalidate: 60,
  };
};

export default Page;
