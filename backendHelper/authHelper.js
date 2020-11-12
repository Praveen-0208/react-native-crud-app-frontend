import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import API from './backend';

export const SignInCall = (data) => {
  return fetch(`${API}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      Alert.alert('error', err.message);
    });
};

export const SignupCall = (data) => {
  return fetch(`${API}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      Alert.alert('error', err.message);
    });
};

export const signOut = async () => {
  await AsyncStorage.removeItem('auth');
};

export const isAuthenticated = async () => {
  const authDataUnParsed = await AsyncStorage.getItem('auth');
  if (authDataUnParsed) {
    const authData = JSON.parse(authDataUnParsed);
    return authData;
  }
};

export const isTokenExpired = async (signedIn, loading) => {
  const authDataUnparsed = await AsyncStorage.getItem('auth');

  if (authDataUnparsed) {
    const authData = JSON.parse(authDataUnparsed);
    // console.log(Date.now());
    // console.log(authData);

    if (Date.now() < authData.expiredIn) {
      signedIn(true);
      loading(false);
    } else {
      signedIn(false);
      loading(false);
    }
  } else {
    signedIn(false);
    loading(false);
  }
};
