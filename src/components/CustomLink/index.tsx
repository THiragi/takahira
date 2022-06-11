import React from 'react';
import Link from 'next/link';

type Props = {
  children: string;
  href: string;
};

const CustomLink: React.VFC<Props> = ({ children, href }) =>
  // "/"で始まるhrefはサイト内リンク、
  // それ以外の"https://"などのhrefは外部リンクと見做す。
  href.startsWith('/') || href === '' ? (
    <Link href={href} prefetch={false}>
      <a>{children}</a>
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );

export default CustomLink;
