import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {signOut} from '../backendHelper/authHelper';
import styles from '../styles/components/HeaderComponentStyles';
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

export default HeaderComponent;
