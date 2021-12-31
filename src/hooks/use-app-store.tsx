import {useContext} from 'react';
import {storeContext} from '../app-store/app-store-provider';

export const useAppStore = () => {
  const store = useContext(storeContext);

  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }

  return store;
};
