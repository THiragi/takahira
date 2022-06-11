import React from 'react';
import SocialLinks from '../SocialLinks';
import styles from './index.module.scss';

const ContactInfo: React.VFC = () => (
  <div className={styles.contact}>
    <svg
      width="56"
      height="56"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 4C1.89543 4 1 4.89543 1 6V20C1 21.1046 1.89543 22 3 22H24C25.1046 22 26 21.1046 26 20V6C26 4.89543 25.1046 4 24 4H3ZM5.86502 6.77455C5.18823 6.29681 4.25229 6.45818 3.77455 7.13498C3.29681 7.81177 3.45818 8.74771 4.13498 9.22545L12.635 15.2255C13.1536 15.5915 13.8464 15.5915 14.365 15.2255L22.865 9.22545C23.5418 8.74771 23.7032 7.81177 23.2255 7.13498C22.7477 6.45818 21.8118 6.29681 21.135 6.77455L13.5 12.1639L5.86502 6.77455Z"
        fill="rgb(64, 64, 64)"
      />
    </svg>

    <h3>w1th1nmybr41n@gmail.com</h3>
    <SocialLinks />
  </div>
);

export default ContactInfo;
