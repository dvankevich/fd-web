import { useState } from 'react';
import {
  Button,
  Loader,
  MainTitle,
  PathInfo,
  Select,
  Subtitle,
  type SelectOption,
} from '@shared/ui';
import { MODAL_NAME, modalObserver } from '@shared/lib';
import { Hero } from '@features/home/Hero';
import { Testimonials } from '@features/testimonials';

const categoryOptions: SelectOption[] = [
  { value: 'beef', label: 'Beef' },
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'chicken', label: 'Chicken' },
  { value: 'dessert', label: 'Dessert' },
];

export default function HomePage() {
  const [showLoader, setShowLoader] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<SelectOption | null>(null);

  const handleShowLoader = () => {
    setShowLoader(true);
    setTimeout(() => setShowLoader(false), 2000);
  };

  return (
    <main>
      <Hero />
      <Testimonials />

      <div className="container" style={{ paddingBottom: 80 }}>
        <PathInfo pageName="Home (demo)" />
        <MainTitle text="UI Components Demo" />
        <Subtitle text="Тимчасова сторінка для перевірки shared UI + auth модалок." />

        <section style={{ marginBottom: 40 }}>
          <h3 style={{ marginBottom: 16, fontWeight: 700 }}>Buttons & Modals</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Button variant="primary" onClick={() => modalObserver.open(MODAL_NAME.signIn)}>
              Sign In Modal
            </Button>
            <Button variant="secondary" onClick={() => modalObserver.open(MODAL_NAME.signUp)}>
              Sign Up Modal
            </Button>
            <Button variant="ghost" onClick={() => modalObserver.open(MODAL_NAME.logOut)}>
              Log Out Modal
            </Button>
            <Button variant="ghost" onClick={handleShowLoader}>
              Show Loader (2s)
            </Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
        </section>

        <section style={{ marginBottom: 40, maxWidth: 360 }}>
          <h3 style={{ marginBottom: 16, fontWeight: 700 }}>Select</h3>
          <Select
            options={categoryOptions}
            placeholder="Select a category"
            value={selectedCategory}
            onChange={(option) => setSelectedCategory(option)}
          />
          {selectedCategory && (
            <p style={{ marginTop: 12, color: 'var(--text-grey)' }}>
              Selected: <strong>{selectedCategory.label}</strong>
            </p>
          )}
        </section>

        {showLoader && <Loader />}
      </div>
    </main>
  );
}
