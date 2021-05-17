import React from 'react';
import Image from 'next/image';
import styles from './index.module.scss';

const Profile: React.VFC = () => (
  <section className={styles.profile}>
    <Image
      alt="portrait"
      src="/static/images/profile.png"
      height={120}
      width={120}
    />
    <h1>takahira</h1>
    <p>Web上で動くあれこれを作ってます。</p>
  </section>
);

export default Profile;
