/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';

import { BlogListResponse } from '../../types/blog';

import client from '../../utils/api';

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

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const blogListPromise = client.v1.blog.$get({
    query: { fields: 'id,title' },
  });

  const [blogList] = await Promise.all([blogListPromise]);

  return {
    props: { blogList },
    revalidate: 60,
  };
};

export default Page;
