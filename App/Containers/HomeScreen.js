import React, { Component } from 'react';
import { ActivityIndicator, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import SearchInput from '../Components/SearchInput';
import UserList from '../Components/UserList';
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
      loading: false,
      search: ''
    };
    this.timeout = 0;
  }

  componentDidMount() {
    this.props.attemptGetUser();
  }

  onSearchUser = text => {
    this.setState({ search: text }, () => {
      let { search } = this.state;
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        //search function
        this.props.attemptGetUser(search);
      }, 1000);
    });
  };

  readerSearchBox() {
    const { search } = this.state;
    return (
      <SearchInput
        value={search}
        placeholder="Search user"
        onChangeText={text => this.onSearchUser(text)}
      />
    );
  }

  renderUserList() {
    const { users } = this.props;
    return (
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <UserList name={item.name} image={item.profile_image.small} />
        )}
        keyExtractor={item => item.id}
      />
    );
  }

  renderSpinner() {
    return <ActivityIndicator size="small" color={Colors.primary} />;
  }
  render() {
    const { fetching } = this.props;
    return (
      <View style={styles.mainContainer}>
        {this.readerSearchBox()}
        {fetching ? this.renderSpinner() : this.renderUserList()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.user.fetching,
    users: state.user.users,
    error: state.user.error,
    types: state.user.types
  };
};

const mapDispatchToProps = dispatch => ({
  attemptGetUser: search => dispatch(UserActions.userRequest(search))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
