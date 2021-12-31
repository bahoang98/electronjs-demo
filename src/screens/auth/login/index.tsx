import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Image,
} from 'react-native';
import {LoginHook} from './hook';
import {IconFB, IconGG} from '../../../assets';
import {useStyleLoginScreen} from './styles';
import {Button} from '../../../components';

const URI_BG = {
  uri: 'https://mytourcdn.com/upload_images/Image/Location/1_9_2015/9-kham-pha-ha-noi-xua-va-nay-mytour-2.jpg',
};

export const LoginScreen = ({navigation}: any) => {
  const useHook = LoginHook({navigation});
  const {styles} = useStyleLoginScreen();
  return (
    <ImageBackground
      source={URI_BG}
      resizeMode="cover"
      style={[styles.wrapper]}
      imageStyle={{opacity: 0.6}}>
      <View style={styles.container}>
        <TextInput
          placeholder="Email Address / Mobile Number"
          style={styles.input}
          placeholderTextColor="#fff"
          onChangeText={useHook.onChange('email')}
        />
        <TextInput
          placeholder="Password (Required)"
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#fff"
          onChangeText={useHook.onChange('password')}
        />

        <Button
          onPress={useHook.onLogin}
          title="LOGIN"
          loading={useHook.isFetching}
        />

        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={styles.forgotTxt}>Forgot Password</Text>
          </TouchableOpacity>

          <Text style={styles.orTxt}>OR</Text>

          <View style={styles.containerSocial}>
            <TouchableOpacity style={styles.btnSocial}>
              <Image source={IconGG} style={styles.iconSocial} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnSocial}>
              <Image source={IconFB} style={styles.iconSocial} />
            </TouchableOpacity>
          </View>
        </View>

        <Button
          onPress={useHook.onNavigation('RegisterScreen')}
          title="SIGN UP"
        />
      </View>
    </ImageBackground>
  );
};
