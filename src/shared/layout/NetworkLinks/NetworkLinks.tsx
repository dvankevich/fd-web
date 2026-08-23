import styles from './NetworkLinks.module.css';

const links = [
  {
    href: 'https://www.facebook.com/goITclub/',
    label: 'Facebook',
    icon: 'icon-facebook',
  },
  {
    href: 'https://www.instagram.com/goitclub/',
    label: 'Instagram',
    icon: 'icon-instagram',
  },
  {
    href: 'https://www.youtube.com/c/GoIT',
    label: 'YouTube',
    icon: 'icon-youtube',
  },
];

export function NetworkLinks() {
  return (
    <ul className={styles.list}>
      {links.map(link => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            aria-label={link.label}
          >
            <svg className={styles.icon}>
              <use href={`/src/assets/icons.svg#${link.icon}`} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}