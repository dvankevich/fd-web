import { Logo } from '@app/layout/Logo';
import { NetworkLinks } from '@app/layout/NetworkLinks';
import { Copyright } from '@app/layout/Copyright';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className="container">
          <div className={styles.top}>
            <Logo />
            <NetworkLinks />
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <Copyright />
        </div>
      </div>
    </footer>
  );
}
