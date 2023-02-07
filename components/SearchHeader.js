import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TextInput,
  Pressable,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SearchContext from '../contexts/SearchContext';

function SearchHeader() {
  const {width} = useWindowDimensions();
  const {keyword, onChangeText} = useContext(SearchContext);
  return (
    <View style={[styles.container, {width: width - 20}]}>
      <TextInput
        style={styles.input}
        placeholder="검색어를 입력하세요"
        autoFocus
        placeholderTextColor="black"
        value={keyword}
        onChangeText={onChangeText}
      />
      <Pressable
        style={({pressed}) => {
          return [styles.button, pressed && {opacity: 0.5}];
        }}
        onPress={() => onChangeText('')}>
        <MaterialIcons name="cancel" size={40} color="#9e9e9e" />
      </Pressable>
    </View>
  );
}

export default SearchHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  //
  input: {
    flex: 1,
    color: 'black',
    fontSize: 20,
    height: '100%',
    margin: 0,
  },
  button: {
    marginLeft: 8,
  },
});
