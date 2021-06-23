import React from 'react';
import Image from 'next/image';
import SocialLinks from '../socialLinks';
import styles from './index.module.scss';

const Profile: React.VFC = () => (
  <div className={styles.card}>
    <div className={styles.profile}>
      <div>
        <Image
          alt="portrait"
          src="/static/images/20210623b.png"
          height={164}
          width={164}
          className={styles.portrait}
        />
      </div>

      <div className={styles.info}>
        <h2>takahira</h2>
        <p>デザインと関数型プログラミングが好きです。</p>
        <SocialLinks />
      </div>
    </div>
  </div>
);

export default Profile;
