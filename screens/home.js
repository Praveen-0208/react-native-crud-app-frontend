import React, {useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import authContext from '../Context/authContext';
import HeaderComponent from '../Components/HeaderComponent';

const Home = () => {
  const isSignedIn = useContext(authContext);

  return (
    <View>
      <HeaderComponent signedIn={isSignedIn} />
      <View style={styles.container}>
        <Text>This is the Home Page</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

export default Home;
