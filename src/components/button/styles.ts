import {StyleSheet} from 'react-native';
import {Platform} from '../../helper/platform';

export const useStyleButtonComponent = () => {
  const styles = StyleSheet.create({
    titleStyle: {
      color: '#fff',
      fontSize: Platform.handleScale(16),
    },
    container: {
      backgroundColor: '#0099FF',
      marginVertical: 20,
      borderRadius: Platform.handleScale(54),
      alignSelf: 'flex-start',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      height: Platform.handleScale(50),
      flexDirection: 'row',
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: '#eee',
    },
    loading: {
      position: 'absolute',
      right: Platform.handleScale(20),
    },
    disabled: {
      flex: 1,
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(219, 225, 254, 0.5)',
    },
  });

  return {styles};
};
