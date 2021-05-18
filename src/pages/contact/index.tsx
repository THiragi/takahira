import React from 'react';
import { NextPage } from 'next';

import Container from '../../components/container';
import Profile from '../../components/profile';

const Contact: NextPage = () => (
  <Container section="contact" title="contact - takahira">
    <Profile />
  </Container>
);

export default Contact;
