import React, {useState, useRef, useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {isAuthenticated} from '../backendHelper/authHelper';
import API from '../backendHelper/backend';

const ImageDisplay = () => {
  const [authData, setAuthData] = useState('');
  const imageRef = useRef();

  const imgSource = require('../default_user.png');

  const changeImgSource = () => {
    console.log(authData);
    imageRef.current.setNativeProps({
      source: Image.resolveAssetSource(imgSource),
    });
  };

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
          ref={imageRef}
          source={{
            uri: `${API}/${authData.user.id}/photo?${new Date()}`,
          }}
          onError={changeImgSource}
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
