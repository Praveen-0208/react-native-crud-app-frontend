import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from './screens/home';
import SignIn from './screens/signin';
import SignUp from './screens/signup';
import Profile from './screens/profile';

import authContext from './Context/authContext';
import {isTokenExpired} from './backendHelper/authHelper';
import {Overlay} from 'react-native-elements';
import {ActivityIndicator} from 'react-native';

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isTokenExpired(setIsSignedIn, setLoading);
  }, []);

  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  return loading ? (
    <Overlay isVisible={loading}>
      <ActivityIndicator color="#0000ff" />
    </Overlay>
  ) : (
    <NavigationContainer>
      <authContext.Provider value={setIsSignedIn}>
        {isSignedIn ? (
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home';
                } else if (route.name === 'Profile') {
                  iconName = focused ? 'user-circle' : 'user-circle-o';
                }
                return <Icon name={iconName} size={size} color={color} />;
              },
            })}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Signin" component={SignIn} />
            <Stack.Screen name="Signup" component={SignUp} />
          </Stack.Navigator>
        )}
      </authContext.Provider>
    </NavigationContainer>
  );
};

export default App;
