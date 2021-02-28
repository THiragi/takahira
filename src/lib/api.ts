/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

import aspida from '@aspida/fetch';

import api from '../api/$api';
import toStringId from './toStringId';

const fetchConfig: Required<Parameters<typeof aspida>>[1] = {
  baseURL: process.env.MICRO_CMS_HOST,
  throwHttpErrors: true,
  headers: {
    'X-API-KEY': process.env.MICRO_CMS_API_KEY ?? '',
  },
};

const client = api(aspida(fetch, fetchConfig));

export default client;

export const getAllBlogs = async () => {
  const blogList = await client.v1.blog.$get({
    query: { fields: 'id,title' },
  });

  return blogList;
};

export const getAllTags = async () => {
  const tagList = await client.v1.tag.$get({
    query: { fields: `id,title` },
  });

  return tagList;
};

export const getBlogsByTag = async (id: string) => {
  const blogList = await client.v1.blog.$get({
    query: {
      fields: 'id,title',
      filters: `tags[contains]${id}`,
    },
  });

  return blogList;
};

export const getBlogData = async (
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
      fields: 'id,title,body,publishedAt,tags',
      ...draftKey,
    },
  });

  return { blog, ...draftKey };
};
