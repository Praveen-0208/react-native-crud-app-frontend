import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import authContext from '../context/authContext';
import {Button} from 'react-native-elements';
import {getUserProfile} from '../backendHelper/userProfileHelper';
import {isAuthenticated} from '../backendHelper/authHelper';

import EditProfile from '../components/EditProfile';
import EditPhoto from '../components/EditPhoto';
import ImageDisplay from '../components/ImageDisplay';
import HeaderComponent from '../components/HeaderComponent';
import DeleteModal from '../components/DeleteModal';

const Profile = ({navigation}) => {
  const isSignedIn = useContext(authContext);

  const [error, setError] = useState(false);
  const [data, setData] = useState({});

  const [edit, setEdit] = useState(false);
  const [editPhoto, setEditPhoto] = useState(false);
  const [editPhotoErr, setEditPhotoErr] = useState(false);
  const [imagePresent, setImagePresent] = useState(true);

  const [deleteProfile, setDeleteProfile] = useState(false);

  const preload = async () => {
    let auth = await isAuthenticated();

    getUserProfile(auth.user.id, auth.token).then((responseData) => {
      setError(false);
      if (responseData.error) {
        setError(true);
      } else {
        setData(responseData);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      preload();
    });
    navigation.addListener('blur', () => {
      setEdit(false);
    });
  }, [navigation]);

  return (
    <View>
      <HeaderComponent signedIn={isSignedIn} />
      {error ? (
        <Text>Error getting profile</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.imageHolder}>
            {imagePresent ? (
              <ImageDisplay setImagePresent={setImagePresent} />
            ) : (
              <Image
                source={require('../assets/images/default_user.png')}
                style={styles.image}
                resizeMethod="scale"
                resizeMode="contain"
              />
            )}
          </View>
          <TouchableOpacity
            onPress={() => {
              setEditPhoto(true);
            }}>
            <Text style={styles.editPhotoLink}>Edit Photo</Text>
          </TouchableOpacity>
          {editPhoto && (
            <EditPhoto
              setEditPhoto={setEditPhoto}
              setPhotoErr={setEditPhotoErr}
              setImagePresent={setImagePresent}
            />
          )}
          {deleteProfile && (
            <DeleteModal
              setDeleteProfile={setDeleteProfile}
              signedIn={isSignedIn}
            />
          )}
          {editPhotoErr && Alert.alert('Upload Failed')}
          {edit ? (
            <EditProfile data={data} setEdit={setEdit} setData={setData} />
          ) : (
            <View style={styles.dataContainer}>
              <View style={styles.dataItem}>
                <Text style={styles.title}>Name</Text>
                <Text style={styles.text}>{data.name}</Text>
              </View>
              <View style={styles.dataItem}>
                <Text style={styles.title}>Email</Text>
                <Text style={styles.text}>{data.email}</Text>
              </View>

              <View style={styles.dataItem}>
                <Text style={styles.title}>Number</Text>
                <Text style={styles.text}>{data.number}</Text>
              </View>
              <Button
                title="Edit Profile"
                buttonStyle={styles.editBtn}
                onPress={() => {
                  setEdit(true);
                }}
              />
              <Button
                title="Delete Account"
                buttonStyle={{...styles.editBtn, backgroundColor: '#AE1438'}}
                onPress={() => setDeleteProfile(true)}
              />
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 100,
  },
  imageHolder: {
    alignSelf: 'center',
  },
  dataContainer: {
    padding: 8,
  },
  dataItem: {
    backgroundColor: '#EAF0F1',
    borderColor: '#DAE0E2',
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  text: {
    fontSize: 15,
  },
  editBtn: {
    marginVertical: 10,
  },
  editPhotoLink: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#0A79DF',
  },
  errMsg: {
    color: 'red',
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 300 / 2,
  },
});

export default Profile;
