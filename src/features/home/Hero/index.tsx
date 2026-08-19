import heroLarge1x from '../../../assets/hero-large-1x.png';
import heroLarge2x from '../../../assets/hero-large-2x.png';
import heroSmall1x from '../../../assets/hero-small-1x.png';
import heroSmall2x from '../../../assets/hero-small-2x.png';

export const Hero = () => {
  const isAuthenticated = false;

  const handleAddRecipeClick = () => {
    if (isAuthenticated) {
      return;
    }
  };

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">IMPROVE YOUR CULINARY TALENTS</h1>
          <p className="hero-subtitle">
            Amazing recipes for beginners in the world of cooking, enveloping you in the aromas and
            tastes of various cuisines.
          </p>
          <button className="hero-btn" onClick={handleAddRecipeClick}>
            ADD RECIPE
          </button>
        </div>
        <div className="hero-images">
          <img
            src={heroLarge1x}
            srcSet={`${heroLarge1x} 1x, ${heroLarge2x} 2x`}
            alt="Delicious meat dish"
            className="hero-img-large"
          />
          <img
            src={heroSmall1x}
            srcSet={`${heroSmall1x} 1x, ${heroSmall2x} 2x`}
            alt="Dessert"
            className="hero-img-small"
          />
        </div>
      </div>
    </section>
  );
};
