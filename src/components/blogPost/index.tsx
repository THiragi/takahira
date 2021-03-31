import React from 'react';
import Link from 'next/link';
import { BlogResponse } from '../../types/blog';

import Date from '../date';

import styles from './index.module.scss';

type Props = {
  post: BlogResponse;
};

const BlogPost: React.FC<Props> = ({ post }) => {
  const { id, publishedAt, title, excerpt } = post;

  return (
    <div className={styles.post}>
      <Link href={`/blog/${id}`}>
        <a>
          <div className={styles.date}>
            <Date dateString={publishedAt} />
          </div>
          <h4>{title}</h4>
          <p>{excerpt}</p>
        </a>
      </Link>
    </div>
  );
};

export default BlogPost;
