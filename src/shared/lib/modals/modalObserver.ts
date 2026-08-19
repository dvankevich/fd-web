import type { Optional } from '@shared/types';
import { createSubscription, type Subscription } from '../createSubscription';
import { isBoolean, isRecord, isValueOf } from '../guards';
import { MODAL_NAME, type ModalName } from './modalNames';

export type ModalParams = Record<string, unknown>;

export interface ModalEntry {
  isOpen: boolean;
  params: ModalParams;
}

export interface ModalEvent {
  name: ModalName;
  entry: Optional<ModalEntry>;
}

type ModalRegistry = Partial<Record<ModalName, ModalEntry>>;

interface ModalObserver extends Pick<Subscription<ModalEvent>, 'subscribe' | 'unsubscribe'> {
  open(name: ModalName, params?: ModalParams): void;
  close(name: ModalName): void;
  closeAll(): void;
  find(name: ModalName): Optional<ModalEntry>;
  openNames(): readonly ModalName[];
}

const MODAL_NAMES: readonly ModalName[] = Object.values(MODAL_NAME);

const isModalName = (value: unknown): value is ModalName => isValueOf(MODAL_NAME, value);

const isModalEntry = (value: unknown): value is ModalEntry =>
  isRecord(value) && isBoolean(value.isOpen) && isRecord(value.params);

const createModalObserver = (): ModalObserver => {
  const { subscribe, unsubscribe, emit } = createSubscription<ModalEvent>('Modal');

  let openList: readonly ModalName[] = [];

  const publish = (name: ModalName, entry: Optional<ModalEntry>) => {
    const opened = MODAL_NAMES.filter((candidate) => registry[candidate]?.isOpen);
    const unchanged =
      opened.length === openList.length && opened.every((item, index) => item === openList[index]);
    if (!unchanged) {
      openList = opened;
    }
    emit({ name, entry });
  };

  const registry = new Proxy<ModalRegistry>(
    {},
    {
      set(target, key, value) {
        if (!isModalName(key) || !isModalEntry(value)) {
          return false;
        }
        target[key] = value;
        publish(key, value);
        return true;
      },
      deleteProperty(target, key) {
        if (!isModalName(key)) {
          return false;
        }
        if (!(key in target)) {
          return true;
        }
        delete target[key];
        publish(key, undefined);
        return true;
      },
    },
  );

  const close: ModalObserver['close'] = (name) => {
    if (isModalName(name)) {
      delete registry[name];
    }
  };

  const closeAll: ModalObserver['closeAll'] = () => {
    MODAL_NAMES.forEach((name) => close(name));
  };

  const open: ModalObserver['open'] = (name, params = {}) => {
    if (!isModalName(name)) {
      return;
    }
    MODAL_NAMES.filter((candidate) => candidate !== name).forEach((candidate) => close(candidate));
    registry[name] = { isOpen: true, params };
  };

  const find: ModalObserver['find'] = (name) => registry[name];

  const openNames: ModalObserver['openNames'] = () => openList;

  return { open, close, closeAll, find, openNames, subscribe, unsubscribe };
};

export const modalObserver = createModalObserver();
