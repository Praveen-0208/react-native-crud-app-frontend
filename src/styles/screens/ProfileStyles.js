import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 100,
  },
  imageHolder: {
    alignSelf: 'center',
  },
  dataContainer: {
    padding: 8,
  },
  dataItem: {
    backgroundColor: '#EAF0F1',
    borderColor: '#DAE0E2',
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  text: {
    fontSize: 15,
  },
  editBtn: {
    marginVertical: 10,
  },
  editPhotoLink: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#0A79DF',
  },
  errMsg: {
    color: 'red',
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 300 / 2,
  },
});
