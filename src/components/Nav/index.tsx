import React from 'react';
import Link from 'next/link';
import styles from './index.module.scss';
import { Home, User, FileText, Mail } from 'react-feather';

const Nav: React.VFC = () => (
  <div className={styles.navbar}>
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>
              <Home />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>
              <User />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/blog" prefetch={false}>
            <a>
              <FileText />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a>
              <Mail />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default Nav;
