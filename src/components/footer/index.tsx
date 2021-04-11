import React from 'react';
import styles from './index.module.scss';

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.copyright}>
      ©{new Date().getFullYear()} takahira All rights reserved.
    </div>
  </footer>
);

export default Footer;
