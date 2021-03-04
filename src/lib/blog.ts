/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

import client from './api';

import toStringId from './toStringId';

export const getAllPosts = async () => {
  const blogList = await client.v1.blog.$get({
    query: { fields: 'id,title,body,publishedAt' },
  });

  return blogList;
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

  const blog = await client.v1.blog._id(id).$get({
    query: {
      fields: 'id,title,body,publishedAt',
      ...draftKey,
    },
  });

  return { blog, ...draftKey };
};
