import type { ReactNode } from 'react';
import css from './Subtitle.module.css';

type Props = {
  children: ReactNode;
};

export default function Subtitle({ children }: Props) {
  return <p className={css.text}>{children}</p>;
}
