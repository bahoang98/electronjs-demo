import React, {ReactNode} from 'react';
import {default as AppStore} from './app-store';

export const storeContext = React.createContext<typeof AppStore | null>(null);

export const StoreProvider = ({children}: {children: ReactNode}) => {
  return (
    <storeContext.Provider value={AppStore}>{children}</storeContext.Provider>
  );
};

StoreProvider.displayName = 'StoreProvider';
