import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@shared/ui';
import { MODAL_NAME, modalObserver } from '@shared/lib';
import { selectIsLoggedIn } from '../../auth/selectors';
import heroLarge1x from '../../../assets/hero-large-1x.webp';
import heroLarge2x from '../../../assets/hero-large-2x.webp';
import heroSmall1x from '../../../assets/hero-small-1x.webp';
import heroSmall2x from '../../../assets/hero-small-2x.webp';
import heroLargeMobile1x from '../../../assets/hero-large-mobile-1x.webp';
import heroLargeMobile2x from '../../../assets/hero-large-mobile-2x.webp';
import heroSmallMobile1x from '../../../assets/hero-small-mobile-1x.webp';
import heroSmallMobile2x from '../../../assets/hero-small-mobile-2x.webp';
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
      <div className="container-wide">
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
            <picture>
              <source
                media="(min-width: 768px)"
                srcSet={`${heroSmall1x} 1x, ${heroSmall2x} 2x`}
                type="image/webp"
              />
              <img
                className={styles.imageSm}
                src={heroSmallMobile1x}
                srcSet={`${heroSmallMobile1x} 1x, ${heroSmallMobile2x} 2x`}
                width={77}
                height={70}
                alt=""
              />
            </picture>

            <picture>
              <source
                media="(min-width: 768px)"
                srcSet={`${heroLarge1x} 1x, ${heroLarge2x} 2x`}
                type="image/webp"
              />
              <img
                className={styles.imageLarge}
                src={heroLargeMobile1x}
                srcSet={`${heroLargeMobile1x} 1x, ${heroLargeMobile2x} 2x`}
                width={190}
                height={172}
                alt=""
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
};
