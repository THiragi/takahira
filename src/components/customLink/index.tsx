import Link from 'next/link';

const CustomLink = ({
  children,
  href,
}: {
  children: string;
  href: string;
}): JSX.Element =>
  // If the link is local it will start with a "/"
  // Otherwise it'll be something like "https://"
  href.startsWith('/') || href === '' ? (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );

export default CustomLink;
