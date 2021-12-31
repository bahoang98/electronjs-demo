import {TextInputProps, TextStyle, ViewStyle} from 'react-native';

export type InputProps = {
  title?: string;
  require?: boolean;
  titleStyle?: TextStyle;
  inputStyle?: TextStyle | ViewStyle;
  titleColor?: string;
  color?: string;
} & TextInputProps;
