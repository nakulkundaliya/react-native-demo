import React, { Component } from 'react';
import { ActivityIndicator, View, FlatList, Text } from 'react-native';
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
      search: '',
      loading: true,
      pageNo: 1
    };
  }

  onSearchUser = text => {
    this.setState({ search: text, pageNo: 1 }, () => {
      let { search, pageNo } = this.state;
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.props.attemptGetUser(search, pageNo);
        this.setState({ pageNo: parseInt(pageNo) + 1 });
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

  fetchMore() {
    const { fetching, pageNo } = this.props;
    let { search } = this.state;

    if (!fetching) {
      this.props.attemptGetUser(search, pageNo);
    }
  }
  renderEmptyComponent() {
    return <Text style={styles.noRecordTextStyle}>No record found</Text>;
  }
  renderUserList() {
    const { users } = this.props;
    if (!users.length) return this.renderEmptyComponent();
    return (
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <UserList
            name={item.name}
            image={item.profile_image.small}
            onPress={() => {
              this.props.navigation.navigate('UserCollectionScreen', {
                username: item.username
              });
            }}
          />
        )}
        keyExtractor={item => item.id}
        onEndReachedThreshold={0.1}
        onEndReached={() => this.fetchMore()}
        extraData={this.props}
        // renderEmptyListComponent={this.renderEmptyComponent}

        // ListFooterComponent={this.renderSpinner}
      />
    );
  }

  renderSpinner() {
    return <ActivityIndicator size="small" color={Colors.primary} />;
  }
  render() {
    const { fetching, users } = this.props;
    return (
      <View style={styles.mainContainer}>
        {this.readerSearchBox()}
        {fetching && !users.length && this.renderSpinner()}
        {this.renderUserList()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.user.fetching,
    users: state.user.users,
    error: state.user.error
  };
};

const mapDispatchToProps = dispatch => ({
  attemptGetUser: (search, pageNo) =>
    dispatch(UserActions.userRequest(search, pageNo)),
  attemptGetPhotos: username =>
    dispatch(UserActions.getCollectionRequest(username))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
