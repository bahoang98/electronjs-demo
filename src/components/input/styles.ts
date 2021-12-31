import {StyleSheet} from 'react-native';
import {Platform} from '../../helper/platform';

export const useStyleInputComponent = () => {
  const styles = StyleSheet.create({
    inputContainer: {
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: 'orange',
      paddingVertical: Platform.handleScale(10),
      paddingHorizontal: Platform.isMobile ? 0 : Platform.handleScale(10),
    },
    titleStyle: {
      fontSize: Platform.handleScale(14),
      color: '#000',
      padding: 0,
      margin: 0,
    },
    container: {
      marginBottom: Platform.handleScale(20),
    },
  });

  return {styles};
};
