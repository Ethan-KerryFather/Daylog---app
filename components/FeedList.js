import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import FeedListItem from './FeedListItem';

function FeedList({logs, onScrolledToBottom}) {
  /*
  FlatList의 장점은 화면에 보이는 아이템만 렌더링하고 나머지 아이템은 미리 렌더링하지 않기 때문에 메모리 효율성이 높다는 것이다. 
  */

  function onScroll(e) {
    if (!onScrolledToBottom) {
      return;
    }

    const {contentSize, layoutMeasurement, contentOffset} = e.nativeEvent;
    const distanceFromBottom =
      contentSize.height - layoutMeasurement.height - contentOffset.y;

    if (distanceFromBottom < 72) {
      console.log('바닥과 가까워요');
      onScrolledToBottom(true);
    } else {
      console.log('바닥과 멀어졌어요');
      onScrolledToBottom(false);
    }
  }

  return (
    <FlatList
      data={logs}
      // logs 배열에서 하나씩 꺼내서 renderItem으로 보낸다.
      renderItem={({item}) => <FeedListItem log={item} />}
      style={styles.container}
      keyExtractor={item => {
        return item.id;
      }}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onScroll={onScroll}
    />
  );
}

export default FeedList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  //
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
    width: '100%',
  },
});
