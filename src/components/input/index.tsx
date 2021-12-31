import React from 'react';
import {View, Text, TextInput as InputRN} from 'react-native';
import {useStyleInputComponent} from './styles';
import {InputProps} from './types';

export const TextInput = ({
  title,
  require,
  titleStyle,
  inputStyle,
  color = '#000',
  titleColor = '#000',
  ...rest
}: InputProps) => {
  const {styles} = useStyleInputComponent();
  const titleShow = require ? `${title}*` : title;
  return (
    <View style={styles.container}>
      <Text style={[styles.titleStyle, {color: titleColor}, titleStyle]}>
        {titleShow}
      </Text>
      <InputRN style={[styles.inputContainer, {color}, inputStyle]} {...rest} />
    </View>
  );
};
