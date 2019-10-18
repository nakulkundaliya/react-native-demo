import React from 'react';
// import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import styles from './Styles/UserListStyle';

const UserList = props => {
  const { image, name } = props;
  return (
    <View style={styles.userViewStyle}>
      <Image
        style={styles.userImageStyle}
        source={{
          uri: image
        }}
      />
      <Text style={styles.userNameStyle}>{name}</Text>
    </View>
  );
};

export default UserList;
