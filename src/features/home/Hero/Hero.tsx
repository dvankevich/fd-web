import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@shared/ui';
import { MODAL_NAME, modalObserver } from '@shared/lib';
import { selectIsLoggedIn } from '../../auth/selectors';
import heroLarge1x from '../../../assets/hero-large-1x.webp';
import heroLarge2x from '../../../assets/hero-large-2x.webp';
import heroSmall1x from '../../../assets/hero-small-1x.webp';
import heroSmall2x from '../../../assets/hero-small-2x.webp';
import styles from './Hero.module.css';

export const Hero = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleAddRecipe = () => {
    if (isLoggedIn) {
      navigate('/recipe/add');
      return;
    }
    modalObserver.open(MODAL_NAME.signIn);
  };

  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.panel}>
          <h1 className={styles.title}>Improve Your Culinary Talents</h1>
          <p className={styles.subtitle}>
            Amazing recipes for beginners in the world of cooking, enveloping you in the aromas and
            tastes of various cuisines.
          </p>
          <Button type="button" variant="onDark" onClick={handleAddRecipe}>
            Add recipe
          </Button>
          <div className={styles.images}>
            <img
              className={styles.imageSm}
              src={heroSmall1x}
              srcSet={`${heroSmall1x} 1x, ${heroSmall2x} 2x`}
              alt=""
            />
            <img
              className={styles.imageLarge}
              src={heroLarge1x}
              srcSet={`${heroLarge1x} 1x, ${heroLarge2x} 2x`}
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};
