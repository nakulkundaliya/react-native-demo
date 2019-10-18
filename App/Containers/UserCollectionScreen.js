import React, { Component } from 'react';
import { FlatList, Image, View } from 'react-native';
import { connect } from 'react-redux';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import UserActions from '../Redux/UserRedux';

// Styles
import { Colors } from '../Themes';

import styles from './Styles/UserCollectionScreenStyle';

class UserCollectionScreen extends Component {
  static navigationOptions = {
    title: 'User Collection',
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

  fetchMore() {
    const { fetching } = this.props;

    if (!fetching) {
      let { pageNo } = this.state;
      this.setState({ pageNo: parseInt(pageNo) + 1 }, () => {
        let { username, pageNo } = this.state;
        this.props.attemptGetPhotos(username, pageNo);
      });
    }
  }

  renderEmptyComponent() {
    return <Text>No record found</Text>;
  }
  renderCollectionList() {
    const { collections } = this.props;
    return (
      <FlatList
        data={collections}
        renderItem={({ item }) => (
          <Image
            source={{
              uri: item.urls.regular
            }}
            style={{ height: 200, width: '50%' }}
          />
        )}
        numColumns={2}
        keyExtractor={item => item.id}
        onEndReachedThreshold={0.1}
        onEndReached={() => this.fetchMore()}
        extraData={this.props}
        renderEmptyListComponent={this.renderEmptyComponent}

        // ListFooterComponent={this.renderSpinner}
      />
    );
  }

  render() {
    return <View>{this.renderCollectionList()}</View>;
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.user.fetching,
    error: state.user.error,
    collections: state.user.collections
  };
};

const mapDispatchToProps = dispatch => ({
  attemptGetPhotos: (username, pageNo) =>
    dispatch(UserActions.getCollectionRequest(username, pageNo))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserCollectionScreen);
