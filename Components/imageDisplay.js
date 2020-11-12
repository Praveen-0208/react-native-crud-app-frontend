import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {isAuthenticated} from '../backendHelper/authHelper';
import API from '../backendHelper/backend';

const ImageDisplay = ({setImagePresent}) => {
  const [authData, setAuthData] = useState('');

  const preloadAuthData = async () => {
    let authdata = await isAuthenticated();
    setAuthData(authdata);
  };

  useEffect(() => {
    preloadAuthData();
  }, []);

  return (
    <View>
      {authData !== '' && (
        <Image
          source={{
            uri: `${API}/${authData.user.id}/photo?${new Date()}`,
          }}
          onError={() => {
            setImagePresent(false);
          }}
          style={styles.image}
          resizeMethod="scale"
          resizeMode="contain"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: 300 / 2,
  },
});

export default ImageDisplay;
