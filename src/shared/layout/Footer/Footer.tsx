import { Logo } from '@shared/layout/Logo';
import { NetworkLinks } from '@shared/layout/NetworkLinks';
import { Copyright } from '@shared/layout/Copyright';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <Logo />
          <NetworkLinks />
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <Copyright />
        </div>
      </div>
    </footer>
  );
}