import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  Button,
  Text,
  Input,
  Divider,
  Overlay,
  Icon,
} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SignInCall} from '../backendHelper/authHelper';
import authContext from '../context/authContext';
import styles from '../styles/screens/SigninStyles';
const SignIn = ({navigation}) => {
  const setLoginFlag = useContext(authContext);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toggle, setToggle] = useState(false);

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const storeToken = async (authData) => {
    try {
      authData.expiredIn = Date.now() + 4 * 3600000;
      await AsyncStorage.setItem('auth', JSON.stringify(authData));
    } catch (err) {
      Alert.alert('error', err.message);
    }
  };

  const login = () => {
    setError(false);
    if (data.email !== '' && data.password !== '') {
      setIsLoading(true);
      SignInCall(data).then((responseData) => {
        if (responseData.error) {
          setIsLoading(false);
          setError(true);
          let message = responseData.error[0].msg
            ? responseData.error[0].msg
            : responseData.error;
          setMsg(message);
        } else {
          setIsLoading(false);
          storeToken(responseData);
          setLoginFlag(true);
        }
      });
    } else {
      setError(true);
      setMsg('Fill all fields');
    }
  };

  const loadingScreen = () => {
    return (
      <View>
        <Overlay isVisible={isLoading}>
          <ActivityIndicator color="#999999" />
        </Overlay>
      </View>
    );
  };

  const handleChange = (value, name) => {
    setData({...data, [name]: value});
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        {loadingScreen()}
        <Input
          placeholder="Email"
          errorStyle={{color: 'red'}}
          onChangeText={(text, name = 'email') => handleChange(text, name)}
        />
        <Input
          placeholder="Password"
          secureTextEntry={!toggle}
          rightIcon={
            <Icon
              name="eye"
              type="font-awesome-5"
              color={toggle ? '#3498DB' : '#A4B0BD'}
              onPress={() => setToggle(!toggle)}
            />
          }
          onChangeText={(text, name = 'password') => handleChange(text, name)}
        />
        <Text style={styles.errorMsg}>{error ? `${msg}` : ''}</Text>
        <Button title="Signin" type="solid" onPress={login} />
      </View>
      <Divider style={styles.dividerStyle} />
      <TouchableOpacity>
        <Text
          style={styles.signupText}
          onPress={() => navigation.navigate('Signup')}>
          Signup Here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
