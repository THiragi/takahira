import React from 'react';
import { NextPage } from 'next';

import Container from '../../components/container';
import Profile from '../../components/profile';

const About: NextPage = () => (
  <Container section="about" title="about - takahira">
    <Profile />
  </Container>
);

export default About;
