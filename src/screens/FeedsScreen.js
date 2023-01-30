import React, {useContext} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import FeedList from '../../components/FeedList';
import FloatingWriteButton from '../../components/FloatingWriteButton';
import LogContext from '../../contexts/LogContext';

// 게시글 예시 객체
// {
//   "id": "71607198-1ae4-4810-8b1b-67df27206b96",
//   "title": "",
//   "body": "Rffd",
//   "date": "2023-01-30T04:24:13.125Z"
// }

function FeedScreen() {
  const {logs} = useContext(LogContext);
  console.log(JSON.stringify(logs, null, 2));
  return (
    <View style={styles.block}>
      <FeedList logs={logs} />
      <FloatingWriteButton />
    </View>
  );
}

export default FeedScreen;

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'red',
    color: 'black',
  },
  input: {
    padding: 16,
    backgroundColor: 'white',
  },
});
