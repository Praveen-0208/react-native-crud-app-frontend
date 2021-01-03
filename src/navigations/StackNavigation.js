import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from '../screens/Signin';
import SignUp from '../screens/Signup';

class StackNavigation extends Component {
  render() {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Signin" component={SignIn} />
        <Stack.Screen name="Signup" component={SignUp} />
      </Stack.Navigator>
    );
  }
}

export default StackNavigation;
