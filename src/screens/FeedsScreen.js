import React, {useContext, useState} from 'react';
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
  const [hidden, setHidden] = useState(false);

  // 스크롤이 바닥에 가까운지를 확인해서 숨긴다.
  const onScrolledToBottom = isBottom => {
    if (hidden !== isBottom) {
      setHidden(!isBottom);
    }
  };

  return (
    <View style={styles.block}>
      <FeedList logs={logs} onScrolledToBottom={onScrolledToBottom} />
      <FloatingWriteButton hidden={hidden} />
    </View>
  );
}

export default FeedScreen;

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  input: {
    padding: 16,
    backgroundColor: 'white',
  },
});
