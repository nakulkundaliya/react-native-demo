import { StyleSheet } from 'react-native';
import { Colors } from '../../Themes';

export default StyleSheet.create({
  userViewStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderWidth: 1,
    marginTop: 5,
    borderColor: Colors.placeHolderText
  },
  userImageStyle: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  userNameStyle: {
    marginLeft: 10,
    fontSize: 16,
    flexShrink: 1
  }
});
