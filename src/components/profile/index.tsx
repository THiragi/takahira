import React from 'react';
import Image from 'next/image';
import styles from './index.module.scss';

const Profile: React.VFC = () => (
  <div className={styles.profile}>
    <Image
      alt="portrait"
      src="/static/images/profile.jpg"
      height={48}
      width={48}
    />
    <h1>takahira</h1>
    <p>関数型プログラミングが好きです。</p>
  </div>
);

export default Profile;
