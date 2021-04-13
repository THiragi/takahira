import React from 'react';
import styles from './index.module.scss';

type Props = {
  id: string;
  title: string;
};

const ShareLinks: React.FC<Props> = ({ id, title }) => {
  const encodedTitle = encodeURIComponent(`${title} | takahira`);
  const copyUrl = () => {
    const el = document.createElement('input');
    el.value = `https://takahira.io/blog/${id}`;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  return (
    <div className={styles.share}>
      <a
        href={`https://twitter.com/share?url=https://takahira.io/blog/${id}/&text=${encodedTitle}&via=levelwood1`}
        rel="nofollow"
      >
        <img
          src="/static/images/socials/twitter/twitter-logo.png"
          alt="twitter"
        />
      </a>
      <a
        href={`http://www.facebook.com/share.php?u=https://takahira.io/blog/${id}/`}
        rel="nofollow"
      >
        <img
          src="/static/images/socials/facebook/facebook-logo.png"
          alt="facebook"
        />
      </a>
      <button type="button" onClick={() => copyUrl()}>
        <img src="/static/images/socials/anchor-logo.png" alt="copy" />
      </button>
    </div>
  );
};

export default ShareLinks;
