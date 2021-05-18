import React from 'react';
import Image from 'next/image';
import styles from './index.module.scss';

const Profile: React.VFC = () => (
  <div className={styles.card}>
    <div className={styles.profile}>
      <Image
        alt="portrait"
        src="/static/images/profile.png"
        height={168}
        width={168}
        className={styles.portrait}
      />

      <div className={styles.info}>
        <h2>takahira</h2>
        <p>デザインと音楽と関数型プログラミングが好きです。</p>
        <div className={styles.socials}>
          <a
            href="https://twitter.com/levelwood1"
            rel="nofollow noopener noreferrer"
            target="_blank"
            title="Twitter"
          >
            <svg viewBox="0 0 27 27">
              <path d="M23.1 8.7v.7c0 8-6.4 14.5-14.4 14.6h-.2C5.7 24 3 23.2.6 21.7c.4 0 .8.1 1.2.1 2.3 0 4.6-.8 6.3-2.1C6 19.6 4 18.2 3.3 16c.3.1.7.1 1 .1.5 0 .9-.1 1.4-.2-2.4-.5-4.1-2.6-4.1-5.1v-.1c.7.4 1.5.6 2.3.7-1.5-1-2.2-2.5-2.2-4.3 0-.9.2-1.8.7-2.6C5 7.8 8.8 9.7 13 9.9c-.1-.4-.1-.8-.1-1.2 0-2.8 2.2-5.2 5.2-5.2 1.5 0 2.8.6 3.8 1.7C23 5 24 4.6 25 4.1c-.4 1.2-1.2 2.1-2.2 2.8 1-.1 2-.4 2.9-.8-.8 1-1.7 1.8-2.6 2.6z" />
            </svg>
          </a>
          <a
            href="https://github.com/THiragi"
            rel="nofollow noopener noreferrer"
            target="_blank"
            title="GitHub"
          >
            <svg viewBox="0 0 27 27">
              <path d="M13.4 1.2C7 1 1.8 6 1.7 12.4v.5c0 5.1 3.2 9.8 8.2 11.5.6.1.7-.2.7-.6v-2.9s-3.3.6-4-1.5c0 0-.6-1.3-1.3-1.8 0 0-1.1-.7.1-.7.7.1 1.5.6 1.8 1.2.6 1.2 2.2 1.7 3.4 1h.1c.1-.6.4-1.2.7-1.6-2.7-.4-5.4-.6-5.4-5.2 0-1.1.5-2.1 1.2-2.8 0-1.1 0-2.2.3-3.2 1-.4 3.3 1.3 3.3 1.3 2-.6 4-.6 6 0 0 0 2.2-1.6 3.2-1.2.5 1 .5 2.2.1 3.2.7.7 1.2 1.8 1.2 2.8 0 4.5-2.8 5-5.5 5.2.6.6.9 1.3.7 2.2v4c0 .5.2.6.7.6 4.9-1.7 8.2-6.2 8-11.5.1-6.4-5.1-11.6-11.6-11.6-.1-.1-.2-.1-.2-.1z" />
            </svg>
          </a>
          <a
            href="https://zenn.dev/thiragi"
            rel="nofollow noopener noreferrer"
            target="_blank"
            title="Zenn"
          >
            <svg viewBox="0 0 27 27">
              <path d="M14.8379 1.24024C14.9286 1.09107 15.0906 1 15.2652 1H19.6148C20.0048 1 20.2447 1.42655 20.0421 1.75976L6.66607 23.7598C6.57537 23.9089 6.41342 24 6.23884 24H1.88916C1.49921 24 1.25934 23.5734 1.46193 23.2402L14.8379 1.24024Z" />
              <path d="M18.886 13.0167C18.9766 12.8673 19.1387 12.776 19.3135 12.776H23.6639C24.0537 12.776 24.2936 13.2021 24.0914 13.5353L17.89 23.7593C17.7994 23.9087 17.6373 24 17.4625 24H13.1121C12.7223 24 12.4824 23.5739 12.6846 23.2407L18.886 13.0167Z" />
            </svg>
          </a>
          <a
            href="https://note.com/monomemo"
            rel="nofollow noopener noreferrer"
            target="_blank"
            title="note"
          >
            <svg viewBox="0 0 27 27">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.422 3.9375L5.9375 8.01431V21.5625H20.625V3.9375H10.422ZM8.72613 1.50928C9.0866 1.18158 9.55627 1 10.0434 1H21.6042C22.6857 1 23.5625 1.87678 23.5625 2.95833V22.5417C23.5625 23.6232 22.6857 24.5 21.6042 24.5H4.95833C3.87678 24.5 3 23.6232 3 22.5417V7.58116C3 7.02941 3.23275 6.50326 3.64102 6.13211L8.72613 1.50928Z"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.8636 6C12.4912 6 13 6.50877 13 7.13636V9.40909C13 10.2877 12.2877 11 11.4091 11H9.13636C8.50877 11 8 10.4912 8 9.86364C8 9.23604 8.50877 8.72727 9.13636 8.72727H10.7273V7.13636C10.7273 6.50877 11.236 6 11.8636 6Z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Profile;
