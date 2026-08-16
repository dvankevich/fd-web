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
import { SignInModal } from '@features/auth/SignInModal';
import { SignUpModal } from '@features/auth/SignUpModal';
import { LogOutModal } from '@features/auth/LogOutModal';

const categoryOptions: SelectOption[] = [
  { value: 'beef', label: 'Beef' },
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'chicken', label: 'Chicken' },
  { value: 'dessert', label: 'Dessert' },
];

type ModalType = 'signin' | 'signup' | null;

export default function HomePage() {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [showLoader, setShowLoader] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<SelectOption | null>(null);

  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const closeModal = () => setModalType(null);

  const handleShowLoader = () => {
    setShowLoader(true);
    setTimeout(() => setShowLoader(false), 2000);
  };

  return (
    <main>
      <div className="container" style={{ paddingBottom: 80 }}>
        <PathInfo pageName="Home (demo)" />
        <MainTitle text="UI Components Demo" />
        <Subtitle text="Тимчасова сторінка для перевірки shared UI + auth модалок." />

        {/* Buttons */}
        <section style={{ marginBottom: 40 }}>
          <h3 style={{ marginBottom: 16, fontWeight: 700 }}>Buttons & Modals</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Button variant="primary" onClick={() => setModalType('signin')}>
              Sign In Modal
            </Button>
            <Button variant="secondary" onClick={() => setModalType('signup')}>
              Sign Up Modal
            </Button>
            <Button variant="ghost" onClick={() => setIsLogoutOpen(true)}>
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

        {/* Auth Modals */}
        <Modal isOpen={modalType === 'signin'} onClose={closeModal}>
          <SignInModal
            onClose={closeModal}
            onSwitchToSignUp={() => setModalType('signup')}
          />
        </Modal>

        <Modal isOpen={modalType === 'signup'} onClose={closeModal}>
          <SignUpModal
            onClose={closeModal}
            onSwitchToSignIn={() => setModalType('signin')}
          />
        </Modal>

        <Modal isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)}>
          <LogOutModal onClose={() => setIsLogoutOpen(false)} />
        </Modal>

        {showLoader && <Loader />}
      </div>
    </main>
  );
}
