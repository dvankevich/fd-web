import { Link } from 'react-router-dom';
import css from './PathInfo.module.css';

type Props = {
  pageName: string;
};

export default function PathInfo({ pageName }: Props) {
  return (
    <p className={css.path}>
      <Link to="/">HOME</Link>
      <span>/</span>
      <b>{pageName}</b>
    </p>
  );
}
