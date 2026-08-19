import { useSyncExternalStore } from 'react';
import type { Optional } from '@shared/types';
import { modalObserver, type ModalEntry } from './modalObserver';
import type { ModalName } from './modalNames';

const NO_MODALS: readonly ModalName[] = [];

export const useModal = (name: ModalName): Optional<ModalEntry> =>
  useSyncExternalStore(
    modalObserver.subscribe,
    () => modalObserver.find(name),
    () => undefined,
  );

export const useOpenModals = (): readonly ModalName[] =>
  useSyncExternalStore(modalObserver.subscribe, modalObserver.openNames, () => NO_MODALS);
