import React, { useState } from 'react';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { BlogResponse } from '../../types/blog';
import { getAllPosts } from '../../lib/blog';
import Container from '../../components/container';
import BlogList from '../../components/blogList';

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
    <Container section="blog" title="blog - takahira">
      <section>
        <input
          aria-label="Search Article"
          type="text"
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="読みたい話題で探す"
        />
        <BlogList posts={filteredPosts} />
      </section>
    </Container>
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const posts = await getAllPosts();

  return {
    props: { posts },
    revalidate: 60 * 60,
  };
};

export default Page;
