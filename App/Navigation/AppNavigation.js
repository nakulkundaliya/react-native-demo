import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../Containers/HomeScreen';
import UserCollectionScreen from '../Containers/UserCollectionScreen';
import styles from './Styles/NavigationStyles';

// Manifest of possible screens
const PrimaryNav = createStackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    UserCollectionScreen: { screen: UserCollectionScreen }
  },
  {
    // Default config for all screens
    initialRouteName: 'HomeScreen',
    navigationOptions: {
      headerStyle: styles.header
    }
  }
);

export default createAppContainer(PrimaryNav);
