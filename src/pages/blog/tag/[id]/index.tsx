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

import client from '../../../../lib/api';

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
        <ul>
          {blogList.contents.map((blog) => (
            <li key={blog.id}>
              <Link href={`/blog/${blog.id}`}>
                <a>{blog.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tagList = await client.v1.tag.$get({
    query: {
      fields: `id`,
    },
  });

  const tagIdList = tagList.contents.map((tag) => ({
    params: {
      id: `${tag.id}`,
    },
  }));

  return {
    fallback: true,
    paths: tagIdList || [],
  };
};

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  const { params } = context;

  if (!params?.id) {
    throw new Error('Error: ID not found');
  }

  try {
    const blogListPromise = client.v1.blog.$get({
      query: {
        fields: 'id,title',
        filters: `tags[contains]${params.id as string}`,
      },
    });

    const [blogList] = await Promise.all([blogListPromise]);

    return {
      props: { blogList },
      revalidate: 60,
    };
  } catch (e) {
    return { notFound: true };
  }
};

export default Page;
