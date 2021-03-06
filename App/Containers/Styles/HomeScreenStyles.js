import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles } from '../../Themes';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  horizontalScroll: {
    height: 50
  },
  noRecordTextStyle: {
    marginTop: 50,
    justifyContent: 'center',
    textAlign: 'center'
  }
});
