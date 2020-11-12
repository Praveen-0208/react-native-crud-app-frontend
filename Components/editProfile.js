import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import {Input, Button, Overlay} from 'react-native-elements';
import {isAuthenticated} from '../backendHelper/authHelper';
import {updateUserProfile} from '../backendHelper/userProfileHelper';

const EditProfile = ({data, setEdit, setData}) => {
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    number: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [msg, setMsg] = useState('');

  const [updatedData, setUpdatedData] = useState({
    name: '',
    email: '',
    number: '',
  });

  useEffect(() => {
    isEmpty();
  }, [updatedData]);

  const isEmpty = () => {
    if (
      updatedData.name === '' &&
      updatedData.email === '' &&
      updatedData.number === ''
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const handleChange = (value, name) => {
    setUpdatedData({...updatedData, [name]: value});
  };

  const onUpdate = async () => {
    setIsLoading(true);
    let auth = await isAuthenticated();

    let temp = updatedData;

    for (let key in temp) {
      if (temp[key] === '') {
        delete temp[key];
      }
    }

    updateUserProfile(auth.user.id, auth.token, updatedData).then(
      (responseData) => {
        if (responseData.error) {
          let errObj = {};
          setIsLoading(false);
          if (responseData.error[0].msg) {
            responseData.error.map((err) => {
              errObj[err.param] = true;
            });
          } else {
            setMsg(responseData.error);
          }
          setErrors(errObj);
        } else {
          setData(responseData);
          setMsg('UPDATED SUCCESSFULLY');
          setRedirect(true);
        }
      },
    );
  };

  const loadingScreen = () => {
    return (
      <View>
        <Overlay isVisible={isLoading}>
          <View>
            <ActivityIndicator color="#999999" />
          </View>
        </Overlay>
      </View>
    );
  };

  const onRedirect = () => {
    if (redirect) {
      return (
        <Overlay isVisible={redirect}>
          <View>
            <Text>{msg}</Text>
            <ActivityIndicator color="#00ff00" />
            {redirect && redirectBack()}
          </View>
        </Overlay>
      );
    }
  };

  const redirectBack = () => {
    setTimeout(() => {
      setEdit(false);
    }, 2000);
  };

  return (
    <View style={styles.dataContainer}>
      {loadingScreen()}
      {onRedirect()}
      <View style={styles.dataItem}>
        <Text style={styles.title}>Name</Text>
        <Input
          style={styles.text}
          placeholder={data.name}
          errorStyle={{color: 'red'}}
          errorMessage={errors.name === true ? 'NAME IS TOO SHORT' : ''}
          onChangeText={(text, name = 'name') => handleChange(text, name)}
        />
      </View>
      <View style={styles.dataItem}>
        <Text style={styles.title}>Email</Text>
        <Input
          style={styles.text}
          placeholder={data.email}
          errorStyle={{color: 'red'}}
          errorMessage={errors.email === true ? 'EMAIL IS NOT VALID' : ''}
          onChangeText={(text, name = 'email') => handleChange(text, name)}
        />
      </View>
      <View style={styles.dataItem}>
        <Text style={styles.title}>Number</Text>
        <Input
          style={styles.text}
          placeholder={data.number}
          errorStyle={{color: 'red'}}
          errorMessage={errors.number === true ? 'PHONENUMBER IS INVALID' : ''}
          onChangeText={(text, name = 'number') => handleChange(text, name)}
        />
      </View>
      <Text style={styles.errorMsg}>{msg !== '' ? `${msg}` : ''}</Text>
      <Button
        title="Update"
        buttonStyle={styles.editBtn}
        disabled={disabled}
        onPress={() => {
          onUpdate();
        }}
      />
      <Button
        title="Cancel"
        buttonStyle={{...styles.editBtn, backgroundColor: '#DFAF2B'}}
        onPress={() => {
          setMsg('Update Cancelled');
          setRedirect(true);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  errorMsg: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 5,
  },
});

export default EditProfile;
