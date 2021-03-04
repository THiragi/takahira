/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';

import { BlogListResponse } from '../../types/blog';

import { getAllPosts } from '../../lib/blog';

type StaticProps = {
  posts: BlogListResponse;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = ({ posts }) => {
  const [searchVal, setSearchVal] = useState<string>('');
  const filteredPosts = posts.contents
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
    )
    .filter(
      (post) => post.title.includes(searchVal) || post.body.includes(searchVal),
    );

  return (
    <main>
      <h1>Blog</h1>
      <section>
        <input
          aria-label="Search Article"
          type="text"
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="記事検索"
        />
        {!filteredPosts.length ? (
          <h3>記事が見つかりません。</h3>
        ) : (
          <ul>
            {filteredPosts.map((blog) => (
              <li key={blog.id}>
                <Link href={`/blog/${blog.id}`}>
                  <a>{blog.title}</a>
                </Link>
                <ul>
                  <li>{blog.publishedAt}</li>
                </ul>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const posts = await getAllPosts();

  return {
    props: { posts },
    revalidate: 60,
  };
};

export default Page;
