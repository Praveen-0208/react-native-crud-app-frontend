import {Alert} from 'react-native';
import API from './backend';

export const getUserProfile = (userId, token) => {
  return fetch(`${API}/${userId}/profile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => Alert.alert(err));
};

export const updateUserProfile = (userId, token, updatedData) => {
  return fetch(`${API}/${userId}/update`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => Alert.alert('error', err.message));
};

export const deleteUserInfo = (userId, token) => {
  return fetch(`${API}/${userId}/delete`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      Alert.alert('error', err.message);
    });
};

export const uploadPhoto = (userId, token, form) => {
  return fetch(`${API}/${userId}/photo/upload`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: form,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      Alert.alert('error', err.message);
    });
};

export const removePhoto = (userId, token) => {
  return fetch(`${API}/${userId}/photo/remove`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => Alert.alert('error', err.message));
};
