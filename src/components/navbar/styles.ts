import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Platform} from '../../helper/platform';

export const useStyleNavbarComponent = () => {
  const insets = useSafeAreaInsets();
  const styles = StyleSheet.create({
    container: {
      marginTop: insets.top,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: Platform.handleScale(375),
      paddingHorizontal: Platform.handleScale(30),
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      paddingVertical: Platform.handleScale(10),
    },
    containerLeft: {
      flex: 1,
    },
    containerRight: {
      flex: 1,
      flexDirection: 'row-reverse',
    },
    title: {
      fontSize: Platform.handleScale(16),
      color: '#000',
    },
  });

  return {styles};
};
