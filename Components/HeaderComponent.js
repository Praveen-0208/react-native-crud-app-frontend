import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {signOut} from '../backendHelper/authHelper';

const HeaderComponent = ({
  signedIn = (temp) => {
    return temp;
  },
}) => {
  const logout = () => {
    signOut();
    signedIn(false);
  };

  return (
    <View style={{overflow: 'hidden'}}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon
            name="power-off"
            type="font-awesome-5"
            color="#fff"
            onPress={logout}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0A79DF',
    alignSelf: 'stretch',
    height: 60,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
});

export default HeaderComponent;
