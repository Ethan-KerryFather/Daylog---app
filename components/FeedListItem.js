import {format, formatDistanceToNow} from 'date-fns';
import {ko} from 'date-fns/locale';
import React, {useRef} from 'react';
import {
  Platform,
  Text,
  StyleSheet,
  View,
  Pressable,
  Animated,
} from 'react-native';

function formatDate(date) {
  const d = new Date(date);
  const now = Date.now();
  const diff = (now - d.getTime()) / 1000;
  // getTime은 기준시점 1970년 1월 1일에서 현지 시점까지의 밀리 초를 반환한다.
  // Date.now()도 마찬가지 빼
  if (diff < 60 * 1) {
    return '방금 전 ';
  }
  if (diff < 60 * 60 * 24 * 3) {
    return formatDistanceToNow(d, {addSuffix: true, locale: ko});
  }

  return format(d, 'PPP EEE p', {locale: ko});
}

const truncate = text => {
  // 정규식을 사용해 모든 줄 바꿈 문자 제거
  const replaced = text.replace(/\n/g, ' ');
  // g플래그는 전역검색 global search를 의미하며 문자열 전체에서 찾아낼 수 있도록 한다.
  if (replaced.length <= 100) {
    return replaced;
  }
  return replaced.slice(0, 100).concat('...');
};

function FeedListItem({log}) {
  const {title, body, date} = log;
  return (
    <Pressable
      // 눌리게 되면 style에 pressed가 전달된다.
      style={({pressed}) => [
        styles.block,
        Platform.OS === 'ios' && pressed && {backgroundColor: '#efefef'},
      ]}
      android_ripple={{color: '#ededed'}}>
      <Text style={styles.date}>{formatDate(date)}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{truncate(body)}</Text>
    </Pressable>
  );
}

export default FeedListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  block: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  date: {
    fontSize: 12,
    color: '#546e7a',
    marginBottom: 8,
  },
  title: {
    color: '#262238',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: {
    color: '#37474f',
    fontSize: 16,
    lineHeight: 21,
  },
});
