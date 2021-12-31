import {Platform} from '../../../helper/platform';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useStyleRegisterScreen = () => {
  const insets = useSafeAreaInsets();
  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#000',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      width: Platform.handleScale(375),
      justifyContent: 'space-between',
      paddingBottom: Platform.handleScale(20) + insets.bottom,
      paddingHorizontal: Platform.handleScale(30),
    },
    button: {
      backgroundColor: '#0099FF',
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
      height: Platform.handleScale(64),
      width: Platform.handleScale(64),
      backgroundColor: '#fff',
      borderRadius: Platform.handleScale(50),
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
    },
    orTxt: {
      fontSize: Platform.handleScale(20),
      color: '#fff',
      marginVertical: Platform.handleScale(14),
    },
    body: {
      flex: 1,
    },
    scroll: {
      flexGrow: 1,
      paddingTop: Platform.handleScale(30),
      paddingBottom: 10,
    },
    main: {
      backgroundColor: Platform.isMobile ? 'transparent' : 'rgba(1,1,1,0.5)',
      borderRadius: 10,
    },
  });

  return {styles};
};
