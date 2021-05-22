/* eslint-disable react/no-danger */
import React from 'react';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import Image from 'next/image';
import unified from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import { getPostData } from '../../../lib/blog';
import Article from '../../../components/article';
import Container from '../../../components/container';
import CustomLink from '../../../components/customLink';
import DraftHeader from '../../../components/draftHeader';
import ShareLinks from '../../../components/shareLinks';
import Profile from '../../../components/profile';
import { BlogResponse } from '../../../types/blog';

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
      {draftKey && <DraftHeader id={postData.id} />}
      <Container
        section="blog"
        title={`${postData.title} - takahira`}
        description={postData.excerpt}
      >
        <Article postData={postData}>
          {processor.processSync(postData.body).result as React.ReactElement}
        </Article>
        <ShareLinks id={postData.id} title={postData.title} />
        <Profile />
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
    revalidate: 60 * 60,
  };
};

export default Page;
