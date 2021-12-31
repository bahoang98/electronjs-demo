export type InfoProps = {
  title?: string;
  message?: string;
  closeOnTouchOutside?: boolean;
  closeOnHardwareBackPress?: boolean;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  confirmButtonColor?: string;
  cancelText?: string;
  confirmText?: string;
  onCancelPressed?: () => void;
  onConfirmPressed?: () => void;
};

export type RefProps = {
  onShow: (infoShow: InfoProps) => void;
  onDismiss: () => void;
};
