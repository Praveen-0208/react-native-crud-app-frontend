import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/navigations/StackNavigation';
import TabNavigation from './src/navigations/TabNavigation';

import authContext from './src/context/authContext';
import {isTokenExpired} from './src/backendHelper/authHelper';
import {Overlay} from 'react-native-elements';
import {ActivityIndicator} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isTokenExpired(setIsSignedIn, setLoading);
  }, []);

  return (
    <Provider store={store}>
      {loading ? (
        <Overlay isVisible={loading}>
          <ActivityIndicator color="#0000ff" />
        </Overlay>
      ) : (
        <NavigationContainer>
          <authContext.Provider value={setIsSignedIn}>
            {isSignedIn ? <TabNavigation /> : <StackNavigation />}
          </authContext.Provider>
        </NavigationContainer>
      )}
    </Provider>
  );
};

export default App;
