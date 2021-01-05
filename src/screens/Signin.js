import React, {Component} from 'react';
import {View} from 'react-native';
import {Button, Text, Input, Divider, Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Loader from '../components/Loader';
import styles from '../styles/screens/SigninStyles';

import {connect} from 'react-redux';
import {
  setEmail,
  setPassword,
  setShowPassword,
  requestSignin,
  signinSuccess,
  signinFailure,
  authenticateSignin,
} from '../redux/actions/signinActions';
import {ShowToast} from '../utils/utils';

class SignIn extends Component {
  constructor(props) {
    super(props);
  }
  handleSignin = async () => {
    if (this.props.login.email !== '') {
      if (this.props.login.password !== '') {
        let data = {
          email: this.props.login.email,
          password: this.props.login.password,
        };
        await this.props.authenticateSignin(data);
        if (this.props.login.errorMessage !== '') {
          ShowToast(this.props.login.errorMessage, 'SHORT', 'TOP');
        } else {
          // this.props.navigation.navigate('Home');
          ShowToast('Login successful', 'SHORT', 'TOP');
        }
      } else {
        ShowToast('Fill password field', 'SHORT', 'BOTTOM');
      }
    } else {
      ShowToast('Enter a valid email', 'SHORT', 'BOTTOM');
    }
  };

  render() {
    return (
      <View>
        <View style={styles.inputContainer}>
          <Loader isVisible={this.props.login.isLoading} />
          <Input
            placeholder="Email"
            errorStyle={{color: 'red'}}
            onChangeText={(value) => this.props.setEmail(value)}
          />
          <Input
            placeholder="Password"
            secureTextEntry={!this.props.login.showPassword}
            rightIcon={
              <Icon
                name="eye"
                type="font-awesome-5"
                color={this.props.login.showPassword ? '#3498DB' : '#A4B0BD'}
                onPress={() =>
                  this.props.setShowPassword(!this.props.login.showPassword)
                }
              />
            }
            onChangeText={(value) => this.props.setPassword(value)}
          />
          <Button title="Signin" type="solid" onPress={this.handleSignin} />
        </View>
        <Divider style={styles.dividerStyle} />
        <TouchableOpacity>
          <Text
            style={styles.signupText}
            onPress={() => this.props.navigation.navigate('Signup')}>
            Signup Here
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.login,
});

export default connect(mapStateToProps, {
  setEmail,
  setPassword,
  setShowPassword,
  requestSignin,
  signinSuccess,
  signinFailure,
  authenticateSignin,
})(SignIn);
