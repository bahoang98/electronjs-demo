import {useState} from 'react';
import {useAppStore} from '../../../hooks/use-app-store';

export const LoginHook = ({navigation}: any) => {
  const {appAuth} = useAppStore();
  const onBack = navigation.goBack;

  const [isFetching, setIsFetching] = useState<boolean>(false);

  const onNavigation = (screenName: string, options?: {[k: string]: any}) => {
    return () => navigation.navigate(screenName, options ?? {});
  };

  const onChange = (type: 'email' | 'password') => {
    return (value: string) => {
      appAuth.updateDataLogin(type, value);
    };
  };

  const onLogin = async () => {
    try {
      setIsFetching(true);
      await appAuth.onLogin();
      global.alertRef?.current?.onShow?.({
        title: 'Notification',
        message: 'Login Success!!!!!!',
      });
    } catch (error) {
      global.alertRef?.current?.onShow?.({
        title: 'Notification',
        message: error!.message!,
      });
    } finally {
      setTimeout(() => setIsFetching(false), 200);
    }
  };

  return {onBack, onNavigation, onLogin, onChange, isFetching};
};
