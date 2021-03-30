import React, { useState } from 'react';

import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

import { BlogListResponse } from '../../types/blog';

import { getAllPosts } from '../../lib/blog';

import Header from '../../components/header';
import Container from '../../components/container';
import BlogPost from '../../components/blogPost';

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
    <>
      <Header title="blog" />
      <Container title="blog">
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
            filteredPosts.map((blog) => <BlogPost key={blog.id} post={blog} />)
          )}
        </section>
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const posts = await getAllPosts();

  return {
    props: { posts },
    revalidate: 120,
  };
};

export default Page;
