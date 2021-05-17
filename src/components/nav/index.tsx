import React from 'react';
import Link from 'next/link';
import styles from './index.module.scss';

const Nav: React.VFC = () => (
  <div className={styles.navbar}>
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>home</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>about</a>
          </Link>
        </li>
        <li>
          <Link href="/blog">
            <a>blog</a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a>contact</a>
          </Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default Nav;
