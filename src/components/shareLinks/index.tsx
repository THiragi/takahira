import React from 'react';
import styles from './index.module.scss';

type Props = {
  id: string;
  title: string;
};

const ShareLinks: React.FC<Props> = ({ id, title }) => {
  const encodedTitle = encodeURIComponent(`${title} | takahira`);

  return (
    <div className={styles.share}>
      <a
        href={`https://twitter.com/share?url=https://takahira.io/blog/${id}/&text=${encodedTitle}&via=levelwood1`}
        rel="nofollow"
      >
        <img
          src="/static/images/socials/twitter/Twitter_social_icons-circle-white.png"
          alt="twitter"
          className={styles.twitter}
        />
      </a>
      <a>
        <img
          src="/static/images/socials/facebook/f_logo_RGB-White_58.png"
          alt="facebook"
          className={styles.facebook}
        />
      </a>
    </div>
  );
};

export default ShareLinks;
