import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator, View} from 'react-native';
import {useStyleButtonComponent} from './styles';
import {ButtonProps} from './types';

export const Button = ({
  title,
  titleStyle,
  contentContainer = {},
  loading = false,
  titleColor = '#fff',
  ...rest
}: ButtonProps) => {
  const {styles} = useStyleButtonComponent();

  return (
    <TouchableOpacity
      style={[styles.container, contentContainer]}
      disabled={loading || rest.disabled}
      {...rest}>
      {rest.disabled ? <View style={[styles.disabled]} /> : null}
      <Text style={[styles.titleStyle, {color: titleColor}, titleStyle]}>
        {title}
      </Text>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};
