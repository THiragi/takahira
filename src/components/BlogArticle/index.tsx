import React from 'react';
import FormatDate from '../FormatDate';

import { BlogResponse } from '../../types/blog';

import styles from './index.module.scss';

type Props = {
  children: React.ReactNode;
  postData: BlogResponse;
};

const BlogArticle: React.FC<Props> = ({ children, postData }) => (
  <article>
    <header>
      <h1 className={styles.title}>{postData.title}</h1>
      <div className={styles.date}>
        published at{' '}
        <FormatDate dateString={postData.publishedAt} dateFormat="yyyy.LL.dd" />
      </div>
    </header>
    <div className={styles.content}>{children}</div>
  </article>
);

export default BlogArticle;
