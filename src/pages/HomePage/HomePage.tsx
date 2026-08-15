import { useState } from 'react';
import {
  Button,
  Loader,
  MainTitle,
  Modal,
  PathInfo,
  Select,
  Subtitle,
  type SelectOption,
} from '@shared/ui';

const categoryOptions: SelectOption[] = [
  { value: 'beef', label: 'Beef' },
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'chicken', label: 'Chicken' },
  { value: 'dessert', label: 'Dessert' },
];

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<SelectOption | null>(null);

  const handleShowLoader = () => {
    setShowLoader(true);
    setTimeout(() => setShowLoader(false), 2000);
  };

  return (
    <main>
      <div className="container" style={{ paddingBottom: 80 }}>
        {/* PathInfo */}
        <PathInfo pageName="Home (demo)" />

        {/* MainTitle + Subtitle */}
        <MainTitle text="UI Components Demo" />
        <Subtitle text="Тимчасова сторінка для перевірки всіх shared UI-компонентів. Після перевірки цей код можна видалити." />

        {/* Buttons */}
        <section style={{ marginBottom: 40 }}>
          <h3 style={{ marginBottom: 16, fontWeight: 700 }}>Buttons</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Open Modal
            </Button>
            <Button variant="secondary" onClick={handleShowLoader}>
              Show Loader (2s)
            </Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
        </section>

        {/* Select */}
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

        {/* Full width button */}
        <section style={{ marginBottom: 40, maxWidth: 360 }}>
          <Button fullWidth variant="secondary">
            Full Width Button
          </Button>
        </section>

        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h3
            style={{
              marginBottom: 16,
              fontSize: 24,
              fontWeight: 800,
              textTransform: 'uppercase',
            }}
          >
            Example Modal
          </h3>
          <p style={{ marginBottom: 24, color: 'var(--text-grey)' }}>
            Закривається по кнопці, по backdrop і по клавіші Escape.
          </p>
          <Button fullWidth onClick={() => setIsModalOpen(false)}>
            Close Modal
          </Button>
        </Modal>

        {/* Loader */}
        {showLoader && <Loader />}
      </div>
    </main>
  );
}
