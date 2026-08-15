import styles from './Subtitle.module.css';

interface SubtitleProps {
  text: string;
  className?: string;
}

export function Subtitle({ text, className = '' }: SubtitleProps) {
  return <p className={`${styles.subtitle} ${className}`}>{text}</p>;
}
