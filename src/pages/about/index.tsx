import React from 'react';
import { NextPage } from 'next';

import Container from '../../components/Container';
import Profile from '../../components/Profile';

const About: NextPage = () => (
  <Container section="about" title="about - takahira">
    <Profile />
    <section>
      <p>以前はホスピタリティ業界で働いていました。</p>
      <p>現在はWeb業界の末席でWebエンジニアっぽいことをやっています。</p>
    </section>
  </Container>
);

export default About;
