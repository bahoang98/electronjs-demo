import {Platform as PlatformRN, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

class PlatformClass {
  static deviceHeight = height;
  static deviceWidth = width;

  deviceHeight = height;
  deviceWidth = width;

  handleValuePlatform = (currentValue: any, webValue?: any) => {
    if (PlatformRN.OS === 'web') {
      return webValue ?? currentValue;
    }
    return currentValue;
  };

  handleScale(currentValue: any, webValue?: any) {
    if (PlatformRN.OS === 'web') {
      return webValue ?? currentValue;
    }
    const ratioWidth = width / 375;
    const ratioHeight = height / 667;
    const ratio = Math.min(ratioWidth, ratioHeight);
    return Math.ceil(currentValue * ratio);
  }

  isMobile = ['ios', 'android'].includes(PlatformRN.OS);
}

const Platform = new PlatformClass();

export {Platform};
