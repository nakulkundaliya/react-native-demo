import React, { Component } from 'react';
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import { Colors } from '../Themes';

import styles from './Styles/UserCollectionScreenStyle';

class UserCollectionScreen extends Component {
  static navigationOptions = {
    title: 'User',
    headerStyle: {
      backgroundColor: Colors.primary
    },
    headerTintColor: Colors.snow
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <Text>UserCollectionScreen</Text>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserCollectionScreen);
