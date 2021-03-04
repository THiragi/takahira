import { ContentResponse, ListContentsResponse } from './api';

export type BlogListResponse = ListContentsResponse<BlogResponse>;

export type BlogResponse = ContentResponse<{
  title: string;
  body: string;
}>;
