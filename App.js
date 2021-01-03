import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/navigations/StackNavigation';
import TabNavigation from './src/navigations/TabNavigation';

import authContext from './src/context/authContext';
import {isTokenExpired} from './src/backendHelper/authHelper';
import {Overlay} from 'react-native-elements';
import {ActivityIndicator} from 'react-native';

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isTokenExpired(setIsSignedIn, setLoading);
  }, []);

  return loading ? (
    <Overlay isVisible={loading}>
      <ActivityIndicator color="#0000ff" />
    </Overlay>
  ) : (
    <NavigationContainer>
      <authContext.Provider value={setIsSignedIn}>
        {isSignedIn ? <TabNavigation /> : <StackNavigation />}
      </authContext.Provider>
    </NavigationContainer>
  );
};

export default App;
