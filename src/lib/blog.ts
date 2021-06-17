import { GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { markdownToHtml, markdownToText } from './transpiler';

import client from './api';

import toStringId from './toStringId';

const getExcerpt = (content: string, length: number) => {
  const contentLength = content.length <= length;
  const excerpt = contentLength ? content : `${content.slice(0, length)}...`;

  return excerpt;
};

export const getAllPosts = async () => {
  const { contents } = await client.v1.blog.$get({
    query: { fields: 'id,title,body,publishedAt' },
  });
  const allposts = contents.map((post) => {
    const body = markdownToText(post.body);
    const excerpt = getExcerpt(body, 110);

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

const isDraft = (item: any): item is { draftKey: string } =>
  !!(item?.draftKey && typeof item.draftKey === 'string');

export const getPostData = async (
  context: GetStaticPropsContext<ParsedUrlQuery>,
) => {
  const { params, previewData } = context;
  if (!params?.id) {
    throw new Error('Error: ID not found');
  }

  const id = toStringId(params.id);
  const draftKey = isDraft(previewData)
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

  const contentHtml = await markdownToHtml(res.body);
  const body = contentHtml.toString();

  const contentText = markdownToText(res.body);
  const excerpt = getExcerpt(contentText, 110);

  const postData = { ...res, body, excerpt, publishedAt };

  return {
    postData,
    ...draftKey,
  };
};
