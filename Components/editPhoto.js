import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View, Text} from 'react-native';
import {BottomSheet, Button, Overlay} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import {isAuthenticated} from '../backendHelper/authHelper';
import {removePhoto, uploadPhoto} from '../backendHelper/userProfileHelper';

const EditPhoto = ({setEditPhoto, setPhotoErr, setImagePresent}) => {
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState('Uploading..');
  const [redirect, setRedirect] = useState(false);

  const choosePhoto = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      compressImageQuality: 0.6,
      cropping: true,
      forceJpg: true,
    })
      .then((image) => {
        submitForm(image);
      })
      .catch(() => {
        setEditPhoto(false);
      });
  };

  const submitForm = async (image) => {
    const auth = await isAuthenticated();

    let form = new FormData();

    let pathSplit = image.path.split('/');
    let fileName = pathSplit[pathSplit.length - 1];

    const photo = {
      name: fileName,
      type: image.mime,
      uri: image.path,
    };
    form.append('profilepic', photo);

    uploadPhoto(auth.user.id, auth.token, form).then((responseData) => {
      if (responseData.error) {
        setPhotoErr(true);
        setEditPhoto(false);
      } else {
        console.log(responseData);
        setImagePresent(true);
        setUploading(true);
        setRedirect(true);
      }
    });
  };

  const remove = async () => {
    let auth = await isAuthenticated();

    removePhoto(auth.user.id, auth.token).then((response) => {
      if (response.error) {
        setMsg('No Image To Remove..');
      } else {
        setMsg('Removing..');
      }
    });
    setImagePresent(false);
    setUploading(true);
    setRedirect(true);
  };

  const uploadingSpinner = () => {
    return (
      <Overlay isVisible={uploading}>
        <View>
          <Text>{msg}</Text>
          <ActivityIndicator color="#7B8788" />
          {redirect && onRedirect()}
        </View>
      </Overlay>
    );
  };

  const onRedirect = () => {
    setTimeout(() => {
      setEditPhoto(false);
    }, 2000);
  };

  return (
    <BottomSheet isVisible={true}>
      {uploadingSpinner()}
      <View>
        <View style={styles.btnContainer}>
          <Button title="Choose from Gallery" onPress={choosePhoto} />
        </View>
        <View style={styles.btnContainer}>
          <Button title="Remove Photo" onPress={remove} />
        </View>
        <View style={styles.btnContainer}>
          <Button
            title="Cancel"
            onPress={() => {
              setEditPhoto(false);
            }}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    padding: 15,
    backgroundColor: 'white',
  },
});

export default EditPhoto;
