import React from 'react';
import Link from 'next/link';

import styles from './index.module.scss';

const DraftHeader: React.VFC<{ id: string }> = ({ id }) => (
  <div className={styles.preview}>
    <div className={styles.nav}>
      <div>プレビューを表示中</div>
      <Link href={`/api/exit-preview?id=${id}`}>
        <a>プレビュー解除</a>
      </Link>
    </div>
  </div>
);

export default DraftHeader;
