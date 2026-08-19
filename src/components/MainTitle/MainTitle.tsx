import type { ReactNode } from 'react';
import css from './MainTitle.module.css';

type Props = {
  children: ReactNode;
};

export default function MainTitle({ children }: Props) {
  return <h1 className={css.title}>{children}</h1>;
}
