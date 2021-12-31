import {useCallback, useMemo, useRef, useState} from 'react';
import {ScrollView} from 'react-native';
import {useAppStore} from '../../../hooks/use-app-store';

export const RegisterHook = ({navigation}: any) => {
  const {appAuth} = useAppStore();
  const scrollRef = useRef<ScrollView>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const onBack = navigation.goBack;

  const disabled = useMemo(() => {
    return !appAuth.isActiveBtnRegister;
  }, [appAuth.isActiveBtnRegister]);

  const onNavigation = (screenName: string, options?: {[k: string]: any}) => {
    return () => navigation.navigate(screenName, options ?? {});
  };

  const onChange = useCallback(
    (type: 'name' | 'email' | 'password' | 'confirmPassword') => {
      return (value: string) => {
        appAuth.updateDataRegister(type, value);
      };
    },
    [appAuth],
  );

  const handleAvoiding = useCallback(() => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd?.();
    }, 50);
  }, []);

  const onRegister = useCallback(async () => {
    try {
      setIsFetching(true);
      await appAuth.onRegister();
      global.alertRef?.current?.onShow?.({
        title: 'Notification',
        message: 'Register Success!!!!!!',
      });
    } catch (error: any) {
      global.alertRef?.current?.onShow?.({
        title: 'Notification',
        message: error!.message!,
      });
    } finally {
      setTimeout(() => setIsFetching(false), 200);
    }
  }, [appAuth]);

  const clearDataRegister = useCallback(() => {
    appAuth.resetDataRegister();
  }, [appAuth]);

  return {
    onBack,
    onNavigation,
    scrollRef,
    handleAvoiding,
    onChange,
    disabled,
    onRegister,
    isFetching,
    clearDataRegister,
  };
};
