import { Suspense, useCallback, type ComponentType } from 'react';
import {
  modalObserver,
  useModal,
  useOpenModals,
  type ModalName,
  type ModalParams,
} from '@shared/lib';
import { Loader } from '../Loader';
import { Modal } from '../Modal';

export interface ModalContentProps {
  onClose: () => void;
  params?: ModalParams;
}

export type ModalComponent = ComponentType<ModalContentProps>;

export type ModalComponents = Record<ModalName, ModalComponent>;

interface ModalHostProps {
  name: ModalName;
  content: ModalComponent;
}

interface ModalRootProps {
  modals: ModalComponents;
}

function ModalHost({ name, content: Content }: ModalHostProps) {
  const entry = useModal(name);

  const close = useCallback(() => {
    modalObserver.close(name);
  }, [name]);

  return (
    <Modal isOpen={Boolean(entry?.isOpen)} onClose={close}>
      <Suspense fallback={<Loader />}>
        <Content onClose={close} params={entry?.params} />
      </Suspense>
    </Modal>
  );
}

export function ModalRoot({ modals }: ModalRootProps) {
  const openNames = useOpenModals();

  return (
    <>
      {openNames.map((name) => (
        <ModalHost key={name} name={name} content={modals[name]} />
      ))}
    </>
  );
}
