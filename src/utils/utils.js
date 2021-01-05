import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, ToastAndroid} from 'react-native';
export const storeToken = async (authData) => {
  try {
    authData.expiredIn = Date.now() + 4 * 3600000;
    await AsyncStorage.setItem('auth', JSON.stringify(authData));
  } catch (err) {
    Alert.alert('error', err.message);
  }
};

export const ShowToast = (errorMessage, duration, gravity) => {
  ToastAndroid.showWithGravity(
    errorMessage,
    duration === 'SHORT' ? ToastAndroid.SHORT : ToastAndroid.LONG,
    gravity === 'TOP' ? ToastAndroid.TOP : ToastAndroid.BOTTOM,
  );
};
