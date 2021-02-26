/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import Link from 'next/link';

import { BlogListResponse } from '../../../../types/blog';

import { getBlogsByTag } from '../../../../lib/api';

type StaticProps = {
  blogList: BlogListResponse;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
const Page: NextPage<PageProps> = (props) => {
  const { blogList } = props;

  return (
    <main>
      <h1>Blog</h1>
      <section>
        {blogList.contents.length ? (
          <ul>
            {blogList.contents.map((blog) => (
              <li key={blog.id}>
                <Link href={`/blog/${blog.id}`}>
                  <a>{blog.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <h2>このタグの記事はありません</h2>
        )}
      </section>
    </main>
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({
  fallback: 'blocking',
  paths: [],
});

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  const { params } = context;

  if (!params?.id) {
    throw new Error('Error: ID not found');
  }

  const blogList = await getBlogsByTag(params.id as string);

  return {
    props: { blogList },
    revalidate: 60,
  };
};

export default Page;
