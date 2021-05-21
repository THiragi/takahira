import React from 'react';
import { NextPage } from 'next';

import Container from '../../components/container';

import ContactInfo from '../../components/contactInfo';

const Contact: NextPage = () => (
  <Container section="contact" title="contact - takahira">
    <ContactInfo />
  </Container>
);

export default Contact;
