/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import { NextPage } from 'next';
import Link from 'next/link';

const Page: NextPage = () => (
  <main>
    <h1>Blog</h1>
    <section>
      <ul>
        <li>
          <Link href="/blog">
            <a>BLOG</a>
          </Link>
        </li>
      </ul>
    </section>
  </main>
);

export default Page;
