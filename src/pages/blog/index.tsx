import React, { useState } from 'react';

import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

import { BlogResponse } from '../../types/blog';

import { getAllPosts } from '../../lib/blog';

import Container from '../../components/container';
import BlogPost from '../../components/blogPost';

import styles from './index.module.scss';

type StaticProps = {
  posts: BlogResponse[];
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = ({ posts }) => {
  const [searchVal, setSearchVal] = useState<string>('');
  const filteredPosts = posts
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
    )
    .filter(
      (post) => post.title.includes(searchVal) || post.body.includes(searchVal),
    );

  return (
    <Container title="blog">
      <section>
        <input
          className={styles.search}
          aria-label="Search Article"
          type="text"
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="記事を探す"
        />
        {!filteredPosts.length ? (
          <h3>記事が見つかりません。</h3>
        ) : (
          filteredPosts.map((blog) => <BlogPost key={blog.id} post={blog} />)
        )}
      </section>
    </Container>
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const posts = await getAllPosts();

  return {
    props: { posts },
    // revalidate: 120,
  };
};

export default Page;
