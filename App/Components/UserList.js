import React from 'react';
// import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './Styles/UserListStyle';

const UserList = props => {
  const { image, name, onPress } = props;
  return (
    <TouchableOpacity style={styles.userViewStyle} onPress={() => onPress()}>
      <Image
        style={styles.userImageStyle}
        source={{
          uri: image
        }}
      />
      <Text style={styles.userNameStyle}>{name}</Text>
    </TouchableOpacity>
  );
};

export default UserList;
