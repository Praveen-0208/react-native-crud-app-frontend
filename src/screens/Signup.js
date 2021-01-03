import React, {useState} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet} from 'react-native';
import {View} from 'react-native';
import {
  Button,
  Divider,
  Icon,
  Input,
  Overlay,
  Text,
} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SignupCall} from '../backendHelper/authHelper';
import styles from '../styles/screens/SignupStyles';
const SignUp = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [passwordHint, setPasswordHint] = useState(false);
  const [msg, setMsg] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    number: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    number: '',
  });

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

  const handleChange = (value, name) => {
    setData({...data, [name]: value});
  };

  const signupForm = () => {
    return (
      <View>
        <Input
          placeholder="Name"
          errorStyle={{color: 'red'}}
          errorMessage={errors.name === true ? 'NAME IS TOO SHORT' : ''}
          onChangeText={(text, name = 'name') => handleChange(text, name)}
        />
        <Input
          placeholder="Email"
          errorStyle={{color: 'red'}}
          errorMessage={errors.email === true ? 'EMAIL IS NOT VALID' : ''}
          onChangeText={(text, name = 'email') => handleChange(text, name)}
        />
        <Input
          placeholder="Password"
          secureTextEntry={!toggle}
          errorStyle={{color: 'red'}}
          errorMessage={
            errors.password === true ? 'PASSWORD LENGTH IS SHORT' : ''
          }
          onFocus={() => {
            setPasswordHint(true);
          }}
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
        {passwordHint && (
          <Text style={{textAlign: 'center'}}>Minimum length: 6</Text>
        )}
        <Input
          placeholder="Phone"
          errorStyle={{color: 'red'}}
          errorMessage={errors.number === true ? 'PHONENUMBER IS INVALID' : ''}
          onChangeText={(text, name = 'number') => handleChange(text, name)}
        />
        <Text style={styles.errorMsg}>{msg !== '' ? `${msg}` : ''}</Text>
        <Button title="Signup" type="solid" onPress={onSubmit} />
      </View>
    );
  };

  const onSubmit = () => {
    if (
      data.name !== '' &&
      data.email !== '' &&
      data.number !== '' &&
      data.password !== ''
    ) {
      setIsLoading(true);
      SignupCall(data).then((responseData) => {
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
          setIsLoading(false);
          setRedirect(true);
        }
      });
    } else {
      setMsg('FILL ALL THE FIELDS');
    }
  };

  const onRedirect = () => {
    if (redirect) {
      return (
        <Overlay isVisible={redirect}>
          <View>
            <Text>ACCOUNT CREATED</Text>
            <ActivityIndicator color="#00ff00" />
            {redirect && redirectToLogin()}
          </View>
        </Overlay>
      );
    }
  };

  const redirectToLogin = () => {
    setTimeout(() => {
      navigation.popToTop();
    }, 2000);
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        {loadingScreen()}
        {onRedirect()}
        {signupForm()}
      </View>
      <Divider style={styles.dividerStyle} />
      <TouchableOpacity>
        <Text
          style={styles.signupText}
          onPress={() => {
            navigation.popToTop();
          }}>
          Cancel
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
