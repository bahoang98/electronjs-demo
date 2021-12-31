import React, {useCallback, useMemo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {IconBack} from '../../assets';
import {useStyleNavbarComponent} from './styles';
import {NavbarProps} from './types';
import {useNavigation} from '@react-navigation/native';

export const Navbar = (props: NavbarProps) => {
  const {title, renderRight, renderLeft, additionalOnBack} = props;
  const {styles} = useStyleNavbarComponent();
  const navigation = useNavigation();

  // func
  const onBack = useCallback(() => {
    navigation.goBack();
    additionalOnBack?.();
  }, [additionalOnBack, navigation]);

  //render
  const renderLeftContent = useMemo(() => {
    if (renderLeft) {
      return renderLeft;
    }
    return (
      <TouchableOpacity onPress={onBack}>
        <IconBack />
      </TouchableOpacity>
    );
  }, [onBack, renderLeft]);
  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}>{renderLeftContent}</View>
      <Text style={styles.title}>{title ?? ''}</Text>
      <View style={styles.containerRight}>{renderRight ?? null}</View>
    </View>
  );
};
