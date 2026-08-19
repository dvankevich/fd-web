export interface Subscription<T> {
  subscribe: (listener: (payload: T) => void) => () => void;
  unsubscribe: (listener: (payload: T) => void) => void;
  emit: (payload: T) => void;
}

export const createSubscription = <T>(label: string): Subscription<T> => {
  const listeners = new Set<(payload: T) => void>();

  const unsubscribe: Subscription<T>['unsubscribe'] = (listener) => {
    listeners.delete(listener);
  };

  const subscribe: Subscription<T>['subscribe'] = (listener) => {
    listeners.add(listener);
    return () => unsubscribe(listener);
  };

  const emit: Subscription<T>['emit'] = (payload) => {
    new Set(listeners).forEach((listener) => {
      try {
        listener(payload);
      } catch (error) {
        console.warn(`${label} listener failed`, error instanceof Error ? error.message : error);
      }
    });
  };

  return { subscribe, unsubscribe, emit };
};
