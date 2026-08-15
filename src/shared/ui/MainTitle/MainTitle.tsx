import styles from './MainTitle.module.css';

interface MainTitleProps {
  text: string;
  className?: string;
}

export function MainTitle({ text, className = '' }: MainTitleProps) {
  return <h2 className={`${styles.title} ${className}`}>{text}</h2>;
}
