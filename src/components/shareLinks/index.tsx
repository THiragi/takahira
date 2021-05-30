import React, { useState } from 'react';
import styles from './index.module.scss';

type Props = {
  id: string;
  title: string;
};

const ShareLinks: React.FC<Props> = ({ id, title }) => {
  const [open, setOpen] = useState<boolean>(false);
  const encodedTitle = encodeURIComponent(`${title} | takahira`);

  // 表示している記事のURLをコピー
  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(`https://takahira.io/blog/${id}`);
      setOpen(true);
    } catch (error) {
      throw new Error(error);
    } finally {
      setTimeout(() => setOpen(false), 3000);
    }
  };

  return (
    <div className={styles.share}>
      <a
        href={`https://twitter.com/share?url=https://takahira.io/blog/${id}/&text=${encodedTitle}&via=levelwood1`}
        rel="nofollow noopener noreferrer"
        target="_blank"
        title="記事をツイート"
      >
        <svg
          viewBox="0 0 64 64"
          width="32"
          height="32"
          fill="rgb(29, 161, 242)"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0)">
            <path d="M57.2774 19.2362C57.3161 19.7962 57.3161 20.3562 57.3161 20.9213C57.3161 38.142 44.2064 58.0026 20.2348 58.0026V57.9923C13.1535 58.0026 6.21935 55.9743 0.258057 52.1497C1.28773 52.2736 2.32257 52.3355 3.35999 52.3381C9.22838 52.3433 14.929 50.3743 19.5458 46.7484C13.969 46.6426 9.0787 43.0065 7.37031 37.6981C9.32386 38.0749 11.3368 37.9975 13.2542 37.4736C7.17419 36.2452 2.79999 30.9033 2.79999 24.6994C2.79999 24.6426 2.79999 24.5884 2.79999 24.5343C4.6116 25.5433 6.63999 26.1033 8.71483 26.1652C2.98838 22.3381 1.22322 14.7201 4.68128 8.76393C11.2981 16.9059 21.0606 21.8555 31.5406 22.3794C30.4903 17.853 31.9252 13.1097 35.311 9.9278C40.56 4.9936 48.8155 5.24651 53.7497 10.493C56.6684 9.91747 59.4658 8.84651 62.0258 7.32909C61.0529 10.3459 59.0168 12.9084 56.2968 14.5368C58.88 14.2323 61.4039 13.5407 63.7806 12.4852C62.031 15.1072 59.8271 17.391 57.2774 19.2362Z" />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect
                width="64"
                height="52.6452"
                fill="none"
                transform="translate(0 6)"
              />
            </clipPath>
          </defs>
        </svg>
      </a>
      <a
        href={`http://www.facebook.com/share.php?u=https://takahira.io/blog/${id}/`}
        rel="nofollow noopener noreferrer"
        target="_blank"
        title="Facebookでシェア"
      >
        <svg
          viewBox="0 0 64 64"
          width="32"
          height="32"
          fill="rgb(24, 119, 242)"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 32.1787C0 48.088 11.888 60.8173 27 63.5V41H19V32H27V25C27 17 31.8213 12.4453 39.112 12.4453C41.4213 12.4453 43.912 12.8 46.2213 13.1547V21H42C38.088 21 37 23.5093 37 26V32H45.8667L44.4453 40.888H37V63.5C52.112 60.8173 64 48.0907 64 32.1787C64 14.48 49.6 0 32 0C14.4 0 0 14.48 0 32.1787Z"
          />
        </svg>
      </a>
      <button
        type="button"
        onClick={copyUrl}
        className={styles.tooltip}
        title="URLをコピー"
      >
        <svg
          viewBox="0 0 64 64"
          width="32"
          height="32"
          fill="rgb(194,196,200)"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5 15.8461C5 14.1468 6.37759 12.7692 8.07693 12.7692H11.1539V55.8462H48.077V58.9231C48.077 60.6224 46.6994 62 45.0001 62H8.07693C6.37759 62 5 60.6224 5 58.9231V15.8461Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M52.6924 18.1543H46.2821C44.2996 18.1543 42.6924 16.5471 42.6924 14.5645V8.15386H21.9231V45.077H52.6924V18.1543ZM44.0908 2C45.1114 2 46.0953 2.3804 46.8505 3.06691L57.5034 12.7514C58.3587 13.5289 58.8463 14.6312 58.8463 15.7871V47.1283C58.8463 49.3941 57.0095 51.2309 54.7437 51.2309H19.8719C17.6061 51.2309 15.7693 49.3941 15.7693 47.1283V6.10257C15.7693 3.83679 17.6061 2 19.8719 2H44.0908Z"
          />
        </svg>
        <span
          style={{
            opacity: open ? 1 : 0,
            visibility: open ? 'visible' : 'hidden',
          }}
          className={styles.tooltipText}
        >
          Copied!
        </span>
      </button>
    </div>
  );
};

export default ShareLinks;
