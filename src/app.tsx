import React, {useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './stacks/auth-stack';
import {Alert} from './components';
import {RefProps} from './components/alert/types';
import {StoreProvider} from './app-store';

export const App = () => {
  const alertRef = useRef<RefProps>(null);
  useEffect(() => {
    if (alertRef) {
      global.alertRef = alertRef;
    }
  }, [alertRef]);
  return (
    <StoreProvider>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
      <Alert ref={alertRef} />
    </StoreProvider>
  );
};
