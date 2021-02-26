/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { BlogResponse } from '../../../types/blog';
import client, { getAllBlogs } from '../../../lib/api';
import toStringId from '../../../lib/toStringId';

type StaticProps = {
  blog: BlogResponse;
  draftKey?: string;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = (props) => {
  const { blog, draftKey } = props;
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {draftKey && (
        <div>
          現在プレビューモードで閲覧中です。
          <Link href={`/api/exit-preview?id=${blog.id}`}>
            <a>プレビューを解除</a>
          </Link>
        </div>
      )}
      <nav>
        <Link href="/">Home</Link>
      </nav>
      <main>
        <header>
          <h1>{blog.title}</h1>
          <ul>
            <li>publishedAt: {blog.publishedAt}</li>
            {blog.tags && blog.tags.length > 0 && (
              <li>
                tag:
                <ul>
                  {blog.tags.map((tag) => (
                    <li key={tag.id}>
                      <Link href={`/blog/tag/${tag.id}`}>{tag.name}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        </header>
        {blog.body && (
          <article dangerouslySetInnerHTML={{ __html: blog.body }} />
        )}
      </main>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  const { contents } = await getAllBlogs();
  const blogIds = contents.map((blog) => ({ params: { id: blog.id } }));

  return {
    fallback: true,
    paths: blogIds || [],
  };
};

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  const { params, previewData } = context;

  console.log(context);
  console.log(previewData);
  if (!params?.id) {
    throw new Error('Error: ID not found');
  }

  const id = toStringId(params.id);
  const draftKey = previewData?.draftKey
    ? { draftKey: previewData.draftKey }
    : {};

  try {
    const blog = await client.v1.blog._id(id).$get({
      query: {
        fields: 'id,title,body,publishedAt,tags',
        ...draftKey,
      },
    });

    return {
      props: { blog, ...draftKey },
      revalidate: 60,
    };
  } catch (e) {
    return { notFound: true };
  }
};

export default Page;
