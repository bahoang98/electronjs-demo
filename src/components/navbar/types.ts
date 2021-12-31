import {ReactNode} from 'react';

export type NavbarProps = {
  title?: string;
  renderLeft?: ReactNode;
  renderRight?: ReactNode;
  colorItem?: string;
  additionalOnBack?: () => void;
};
