import React from 'react';
import styles from './index.module.scss';

const Header: React.VFC<{ section: string }> = ({ section }) => (
  <header className={styles.header}>
    <svg viewBox="0 0 350 350" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="350" height="350" fill="none" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M200 50V150V200H250H300V300H350V200V150L250 150V50L200 50ZM150 50V100L0 100V50L150 50ZM100 300L50 300V150H100V300ZM200 300H250V250H200V300ZM350 100L300 100V50L350 50V100Z"
      />
    </svg>
    <h1 className={styles.title}>{section}</h1>
  </header>
);

export default Header;
