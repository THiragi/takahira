import React from 'react';
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import BlogList from '../components/blogList';
import Container from '../components/container';
import Profile from '../components/profile';
import { BlogResponse } from '../types/blog';
import { getAllPosts } from '../lib/blog';

type StaticProps = {
  posts: BlogResponse[];
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<PageProps> = ({ posts }) => {
  const filteredPosts = posts
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
    )
    .slice(0, 4);
  return (
    <Container section="home">
      <Profile />
      <section>
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

export default Home;
