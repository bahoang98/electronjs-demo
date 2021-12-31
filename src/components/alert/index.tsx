import React, {useState, useRef, forwardRef, useImperativeHandle} from 'react';
import {StyleSheet} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import {InfoProps, RefProps} from './types';

export const Alert = forwardRef((props, ref: any) => {
  const alertRef = useRef<RefProps>();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [info, setInfo] = useState<InfoProps>({});

  useImperativeHandle(ref, () => {
    return {
      onShow: (infoShow: InfoProps) => {
        setInfo(infoShow);
        setShowAlert(true);
      },
      onDismiss: () => {
        setShowAlert(false);
      },
    };
  });

  return (
    <AwesomeAlert
      ref={alertRef as any}
      show={showAlert}
      showProgress={false}
      title={info?.title}
      message={info?.message ?? ''}
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showCancelButton={info?.showCancelButton ?? false}
      showConfirmButton={true}
      cancelText={info?.cancelText ?? 'Cancel'}
      confirmText={info?.confirmText ?? 'Confirm'}
      confirmButtonColor={info?.confirmButtonColor ?? '#DD6B55'}
      onCancelPressed={() => {
        setShowAlert(false);
        info?.onCancelPressed?.();
      }}
      onConfirmPressed={() => {
        setShowAlert(false);
        info?.onConfirmPressed?.();
      }}
      overlayStyle={styles.overlayStyle}
    />
  );
});

const styles = StyleSheet.create({
  overlayStyle: {
    backgroundColor: 'transparent',
  },
});
