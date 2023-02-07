import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const messages = {
  NOT_FOUND: '검색 결과가 없습니다',
  EMPTY_KEYWORD: '검색어를 입력하세요',
};

function EmptySearchResult({type}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{messages[type]}</Text>
    </View>
  );
}

export default EmptySearchResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  //
  text: {
    color: 'black',
    fontSize: 16,
  },
});
