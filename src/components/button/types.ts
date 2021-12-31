import {TouchableOpacityProps, TextStyle, ViewStyle} from 'react-native';

export type ButtonProps = {
  loading?: boolean;
  title?: string;
  require?: boolean;
  titleStyle?: TextStyle;
  inputStyle?: TextStyle | ViewStyle;
  titleColor?: string;
  contentContainer?: ViewStyle;
} & TouchableOpacityProps;
