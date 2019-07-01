import Link from 'next/link';
import css from '../scss/style.scss';
const linkStyle = {
  marginRight: 15
};
export default function Header() {
  return (
    <div className={css.nav}>
      <Link href="/Home" passHref>
        <a style={linkStyle}>Home</a>
      </Link>
      <Link href="/about" passHref>
        <a style={linkStyle} title="About Page">
          About
        </a>
      </Link>
      <Link href="/api" passHref>
        <a style={linkStyle}>api</a>
      </Link>
    </div>
  );
}