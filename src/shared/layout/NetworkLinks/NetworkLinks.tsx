import styles from './NetworkLinks.module.css';

const links = [
  {
    href: 'https://www.facebook.com/goITclub/',
    label: 'Facebook',
    icon: 'f',
  },
  {
    href: 'https://www.instagram.com/goitclub/',
    label: 'Instagram',
    icon: 'in',
  },
  {
    href: 'https://www.youtube.com/c/GoIT',
    label: 'YouTube',
    icon: 'yt',
  },
];

export function NetworkLinks() {
  return (
    <ul className={styles.list}>
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            aria-label={link.label}
          >
            {link.icon}
          </a>
        </li>
      ))}
    </ul>
  );
}
