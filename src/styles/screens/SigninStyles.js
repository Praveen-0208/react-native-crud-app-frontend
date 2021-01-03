import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 20,
    marginTop: Dimensions.get('window').height / 3,
  },
  signupText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#0A79DF',
  },
  dividerStyle: {
    marginTop: 30,
    width: 250,
    alignSelf: 'center',
  },
  errorMsg: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 5,
  },
});
