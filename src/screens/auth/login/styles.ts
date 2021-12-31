import {Platform} from '../../../helper/platform';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useStyleLoginScreen = () => {
  const insets = useSafeAreaInsets();
  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#000',
      paddingTop: insets.top + Platform.handleScale(20),
      justifyContent: 'center',
    },
    container: {
      width: Platform.handleScale(375),
      paddingVertical: Platform.handleScale(80),
      paddingHorizontal: Platform.handleScale(30),
      backgroundColor: Platform.isMobile ? 'transparent' : 'rgba(1,1,1,0.5)',
      justifyContent: 'center',
      borderRadius: 10,
    },
    button: {
      backgroundColor: '#0099FF',
      marginVertical: 20,
      borderRadius: Platform.handleScale(54),
      alignSelf: 'flex-start',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      height: Platform.handleScale(54),
    },
    title: {
      fontSize: Platform.handleScale(40),
      marginBottom: Platform.handleScale(20),
    },
    input: {
      borderBottomWidth: 1,
      borderBottomColor: 'orange',
      paddingHorizontal: 10,
      marginVertical: 10,
      maxWidth: Platform.handleScale(375, 375),
      height: Platform.handleScale(54),
      borderRadius: 4,
      color: '#fff',
      fontSize: Platform.handleScale(16),
    },
    containerSocial: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    titleBtn: {
      color: '#fff',
      fontSize: Platform.handleScale(16),
    },
    btnSocial: {
      height: Platform.handleScale(48),
      width: Platform.handleScale(48),
      backgroundColor: '#fff',
      borderRadius: Platform.handleScale(24),
      overflow: 'hidden',
      marginHorizontal: Platform.handleScale(10),
    },
    iconSocial: {
      width: '100%',
      flex: 1,
    },
    footer: {
      alignItems: 'center',
    },
    forgotTxt: {
      color: '#0099FF',
      fontSize: Platform.handleScale(16),
      textDecorationLine: 'underline',
    },
    orTxt: {
      fontSize: Platform.handleScale(18),
      color: '#fff',
      marginVertical: Platform.handleScale(14),
    },
  });

  return {styles};
};
