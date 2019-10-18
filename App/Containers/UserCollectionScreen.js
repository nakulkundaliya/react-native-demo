import React, { Component } from 'react';
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import UserActions from '../Redux/UserRedux';

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

  constructor(props) {
    super(props);
    this.state = {
      username: props.navigation.state.params.username,
      loading: true,
      pageNo: 1
    };
  }
  componentWillMount() {
    const { username, pageNo } = this.state;
    this.props.attemptGetPhotos(username, pageNo);
  }

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
  return {
    fetching: state.user.fetching,
    error: state.user.error,
    collection: state.user.collection
  };
};

const mapDispatchToProps = dispatch => ({
  attemptGetPhotos: username =>
    dispatch(UserActions.getCollectionRequest(username))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserCollectionScreen);
