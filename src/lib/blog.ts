/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { markdownToHtml, markdownToText } from './transpiler';

import client from './api';

import toStringId from './toStringId';

export const getAllPosts = async () => {
  const { contents } = await client.v1.blog.$get({
    query: { fields: 'id,title,body,publishedAt' },
  });
  const allposts = contents.map((post) => {
    const body = markdownToText(post.body);
    const bodyLength = body.length <= 110;
    const excerpt = bodyLength ? body : `${body.slice(0, 110)}...`;

    return {
      ...post,
      body,
      excerpt,
    };
  });

  return allposts;
};

export const getAllPostIds = async () => {
  const { contents } = await client.v1.blog.$get({
    query: { fields: 'id' },
  });

  return contents.map((post) => ({
    params: {
      id: post.id,
    },
  }));
};

export const getPostData = async (
  context: GetStaticPropsContext<ParsedUrlQuery>,
) => {
  const { params, previewData } = context;
  if (!params?.id) {
    throw new Error('Error: ID not found');
  }

  const id = toStringId(params.id);
  const draftKey = previewData?.draftKey
    ? { draftKey: previewData.draftKey }
    : {};

  const res = await client.v1.blog._id(id).$get({
    query: {
      fields: 'id,title,body,publishedAt,updatedAt',
      ...draftKey,
    },
  });
  // `publishedAt`がundefinedの場合は`updateAt`の値を渡す
  const publishedAt = res?.publishedAt ?? res.updatedAt;

  const contentHtml = markdownToHtml(res.body);

  const body = contentHtml.toString();
  const postData = { ...res, body, publishedAt };

  return {
    postData,
    ...draftKey,
  };
};
