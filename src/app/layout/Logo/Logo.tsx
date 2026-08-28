import type { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

interface LogoProps {
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export function Logo({ onClick }: LogoProps) {
  return (
    <Link to="/" className={styles.logo} onClick={onClick}>
      foodies
    </Link>
  );
}