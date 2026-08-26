import styles from './Copyright.module.css';

export function Copyright() {
  const currentYear = new Date().getFullYear();

  return <p className={styles.text}>&copy; {currentYear}, Foodies. All rights reserved</p>;
}
