import React from 'react';
import { TextInput } from 'react-native';
import { Colors } from '../Themes';

import styles from './Styles/SearchInputStyle';

const SearchInput = props => {
  return (
    <TextInput
      {...props}
      style={styles.inputTextStyle}
      placeholderTextColor={Colors.placeHolderText}
    />
  );
};

export default SearchInput;
