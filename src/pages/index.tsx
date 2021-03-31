import React from 'react';

import { NextPage } from 'next';
import Link from 'next/link';

import Container from '../components/container';

const Home: NextPage = () => (
  <Container>
    <section style={{ textAlign: 'center' }}>
      <p>このページは現在制作中です😌</p>
      <p>
        よろしければ、
        <Link href="/blog">
          <a>blog</a>
        </Link>
        の方を覗いてみてください
      </p>
    </section>
  </Container>
);

export default Home;
