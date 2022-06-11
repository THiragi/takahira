import React from 'react';
import { NextPage } from 'next';

import Container from '../../components/Container';
import Profile from '../../components/Profile';

const About: NextPage = () => (
  <Container section="about" title="about - takahira">
    <Profile />
  </Container>
);

export default About;
