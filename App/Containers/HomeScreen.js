import React, { Component } from 'react';
import {  ActivityIndicator, View } from 'react-native';
import { connect } from 'react-redux';

import { Colors } from '../Themes';

import UserActions from '../Redux/UserRedux';
// Styles
import styles from './Styles/HomeScreenStyles';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'React Native Demo',
    headerStyle: {
      backgroundColor: Colors.primary
    },
    headerTintColor: Colors.snow
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this.props.attemptGetUser();
  }

  onChangeTab = (type, value) => {
    this.props.attemptChangeType(type, !value);
  };

  renderSpinner() {
    return <ActivityIndicator size="small" color={Colors.primary} />;
  }
  render() {
    const { fetching } = this.props;

    return (
      <View style={styles.mainContainer}>
        {fetching ? this.renderSpinner() : null}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.user.fetching,
    payload: state.user.payload,
    error: state.user.error,
    types: state.user.types
  };
};

const mapDispatchToProps = dispatch => ({
  attemptGetUser: () => dispatch(UserActions.userRequest()),
  attemptChangeType: (type, value) =>
    dispatch(UserActions.changeType(type, value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
