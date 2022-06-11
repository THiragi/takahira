import React from 'react';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import Image from 'next/image';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import { getPostData } from '../../../lib/blog';
import BlogArticle from '../../../components/BlogArticle';
import Container from '../../../components/Container';
import CustomLink from '../../../components/CustomLink';
import DraftHeader from '../../../components/DraftHeader';
import ShareLinks from '../../../components/ShareLinks';
import Profile from '../../../components/Profile';
import { BlogResponse } from '../../../types/blog';

type StaticProps = {
  postData: BlogResponse;
  draftKey?: string;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const processor = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeReact, {
    passNode: true,
    Fragment: React.Fragment,
    createElement: React.createElement,
    components: {
      img: Image,
      a: CustomLink,
    },
  } as any);

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
        <BlogArticle postData={postData}>
          {processor.processSync(postData.body).result as React.ReactElement}
        </BlogArticle>
        <ShareLinks id={postData.id} title={postData.title} />
        <Profile />
      </Container>
    </>
  );
};

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
