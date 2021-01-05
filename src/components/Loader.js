import React, {Component} from 'react';
import {View,ActivityIndicator} from 'react-native';
import {Overlay} from 'react-native-elements';

class Loader extends Component {
  render() {
    return (
      <View>
        <Overlay isVisible={this.props.isVisible}>
          <ActivityIndicator color="#999999" />
        </Overlay>
      </View>
    );
  }
}

export default Loader;
