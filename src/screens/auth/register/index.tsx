import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import {RegisterHook} from './hook';
import {useStyleRegisterScreen} from './styles';
import {Button, Navbar, TextInput} from '../../../components';
import {observer} from 'mobx-react';

const URI_BG = {
  uri: 'https://mytourcdn.com/upload_images/Image/Location/1_9_2015/9-kham-pha-ha-noi-xua-va-nay-mytour-2.jpg',
};

export const RegisterScreen = observer(({navigation}: any) => {
  // state
  const {
    scrollRef,
    onChange,
    handleAvoiding,
    onRegister,
    isFetching,
    disabled,
    clearDataRegister,
  } = RegisterHook({navigation});
  const {styles} = useStyleRegisterScreen();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={URI_BG}
        resizeMode="cover"
        style={[styles.wrapper]}
        imageStyle={{opacity: 0.6}}>
        <View style={styles.main}>
          <Navbar title="Create Account" additionalOnBack={clearDataRegister} />
          <KeyboardAvoidingView behavior="padding" style={styles.body}>
            <ScrollView
              bounces={false}
              ref={scrollRef}
              contentContainerStyle={styles.scroll}
              showsVerticalScrollIndicator={false}>
              <View style={styles.container}>
                <View style={styles.body}>
                  {/* <TextInput require title="First Name" titleColor="#fff" /> */}
                  <TextInput
                    require
                    title="Name"
                    titleColor="#fff"
                    color="#fff"
                    onChangeText={onChange('name')}
                  />
                  <TextInput
                    require
                    title="Email"
                    titleColor="#fff"
                    color="#fff"
                    onChangeText={onChange('email')}
                  />
                  <TextInput
                    secureTextEntry
                    require
                    title="Password"
                    titleColor="#fff"
                    color="#fff"
                    onChangeText={onChange('password')}
                  />
                  <TextInput
                    secureTextEntry
                    require
                    title="Confirm Password"
                    titleColor="#fff"
                    color="#fff"
                    onFocus={handleAvoiding}
                    onChangeText={onChange('confirmPassword')}
                  />
                </View>
                <Button
                  title="SIGN UP"
                  disabled={disabled}
                  onPress={onRegister}
                  loading={isFetching}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
});
