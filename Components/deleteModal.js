import React, {useState} from 'react';
import {Modal, Text, StyleSheet, View, ActivityIndicator} from 'react-native';
import {Overlay, Button} from 'react-native-elements';
import {isAuthenticated, signOut} from '../backendHelper/authHelper';
import {deleteUserInfo} from '../backendHelper/userProfileHelper';

const DeleteModal = ({
  setDeleteProfile,
  signedIn = (temp) => {
    return temp;
  },
}) => {
  const [msg, setMsg] = useState('');
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const deleteSpinner = () => {
    return (
      <Overlay isVisible={deleteFlag}>
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
      setDeleteProfile(false);
      signOut();
      signedIn(false);
    }, 2000);
  };

  const deleteAccount = async () => {
    let auth = await isAuthenticated();

    deleteUserInfo(auth.user.id, auth.token).then((response) => {
      setMsg('Deleting..');
      setDeleteFlag(true);
      if (response.error) {
        console.log(response.error);
        setMsg('Account Delete Failed');
        setTimeout(() => {
          setDeleteFlag(false);
          setDeleteProfile(false);
        }, 2000);
      } else {
        setMsg('Account Deleted..');
        setRedirect(true);
      }
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        setDeleteProfile(false);
      }}>
      {deleteSpinner()}
      <Overlay isVisible={true}>
        <View style={styles.container}>
          <Text style={styles.modalText}>Confirm your action</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.col6}>
              <Button
                title="Confirm"
                buttonStyle={{...styles.editBtn, backgroundColor: '#AE1438'}}
                onPress={deleteAccount}
              />
            </View>
            <View style={styles.col6}>
              <Button title="Cancel" onPress={() => setDeleteProfile(false)} />
            </View>
          </View>
        </View>
      </Overlay>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 100,
  },
  modalText: {
    fontSize: 20,
    textAlign: 'center',
  },
  col6: {
    flex: 3,
    margin: 30,
  },
});

export default DeleteModal;
