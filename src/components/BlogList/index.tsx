import React from 'react';
import { BlogResponse } from '../../types/blog';
import BlogCard from '../../components/BlogCard';

type Props = {
  posts: BlogResponse[];
};

const BlogList: React.FC<Props> = ({ posts }) => (
  <>
    {!posts.length ? (
      <h3>記事が見つかりません。</h3>
    ) : (
      posts.map((post) => <BlogCard key={post.id} post={post} />)
    )}
  </>
);

export default BlogList;
