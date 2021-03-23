import React from 'react';
import Link from 'next/link';
import { BlogResponse } from '../../types/blog';

type Props = {
  post: BlogResponse;
};

const BlogPost: React.FC<Props> = ({ post }) => {
  const { id, publishedAt, title, body } = post;

  return (
    <Link href={`/blog/${id}`}>
      <a>
        <div>
          <div>{publishedAt}</div>
          <h4>{title}</h4>
          <p>
            {body.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '').slice(0, 50)}...
          </p>
        </div>
      </a>
    </Link>
  );
};

export default BlogPost;
