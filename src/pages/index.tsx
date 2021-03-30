import React from 'react';

import { NextPage } from 'next';
import Link from 'next/link';
import Header from '../components/header';

import Container from '../components/container';

const Home: NextPage = () => (
  <>
    <Header title="takahira" />
    <Container>
      <section style={{ textAlign: 'center' }}>
        <p>まだなにもありません...現在制作中です</p>
        <p>
          <Link href="/blog">
            <a>blog一覧へ戻る</a>
          </Link>
        </p>
      </section>
    </Container>
  </>
);

export default Home;
