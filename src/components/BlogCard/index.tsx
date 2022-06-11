import React from 'react';
import Link from 'next/link';
import { BlogResponse } from '../../types/blog';

import Date from '../date';

import styles from './index.module.scss';

type Props = {
  post: BlogResponse;
};

const BlogCard: React.VFC<Props> = ({ post }) => {
  const { id, publishedAt, title, excerpt } = post;

  return (
    <div className={styles.post}>
      <Link href={`/blog/${id}`} prefetch={false}>
        <a>
          <div className={styles.date}>
            <Date dateString={publishedAt} dateFormat="yyyy.LL.dd" />
          </div>
          <h1>{title}</h1>
          <p>{excerpt}</p>
        </a>
      </Link>
    </div>
  );
};

export default BlogCard;
