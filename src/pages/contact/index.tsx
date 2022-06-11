import React from 'react';
import { NextPage } from 'next';

import Container from '../../components/Container';

import ContactInfo from '../../components/ContactInfo';

const Contact: NextPage = () => (
  <Container section="contact" title="contact - takahira">
    <ContactInfo />
  </Container>
);

export default Contact;
