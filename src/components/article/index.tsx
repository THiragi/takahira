import React from 'react';
import Date from '../date';

import { BlogResponse } from '../../types/blog';

import styles from './index.module.scss';

type Props = {
  children: React.ReactNode;
  postData: BlogResponse;
};

const Article: React.FC<Props> = ({ children, postData }) => (
  <article>
    <header>
      <h1 className={styles.title}>{postData.title}</h1>
      <div className={styles.date}>
        published at{' '}
        <Date dateString={postData.publishedAt} dateFormat="yyyy.LL.dd" />
      </div>
    </header>
    <div className={styles.content}>{children}</div>
  </article>
);

export default Article;
