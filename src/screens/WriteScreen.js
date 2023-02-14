import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import WriteHeader from '../../components/WriteHeader';
import WriteEditor from '../../components/WriteEditor';
import {useNavigation} from '@react-navigation/native';
import LogContext from '../../contexts/LogContext';

/*
  useNavigate('Write', {log}) 로 넘기면
  route.params로 넘어오게 된다. 그리고 거기서 꺼내면 된다.

  onSave()
  로그가 존재하지 않으면 --> 글을 새롭게 써야하는 상황
  로그가 존재하면 --> 목록을 클릭해서 수정하러 들어온 것
 */

function WriteScreen({route}) {
  // variables, constants
  const log = route.params?.log;
  const [title, setTitle] = useState(log?.title ?? '');
  const [body, setBody] = useState(log?.body ?? '');
  const [date, setDate] = useState(log ? new Date(log.date) : new Date());

  const navigation = useNavigation();
  const {onCreate, onModify, onRemove} = useContext(LogContext);

  function onSave() {
    if (log) {
      onModify({
        id: log.id,
        date: date.toISOString(),
        title,
        body,
      });
    } else {
      onCreate({
        title,
        body,
        date: date.toISOString(),
      });
    }

    navigation.pop();
  }

  const onAskRemove = () => {
    Alert.alert(
      '삭제',
      '정말로 삭제하시겠어요?',
      [
        {text: '취소', style: 'cancel'},
        {
          text: '삭제',
          onPress: () => {
            onRemove(log?.id);
            navigation.pop();
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <SafeAreaView style={styles.block}>
      <WriteHeader
        onSave={onSave}
        onAskRemove={onAskRemove}
        isEditing={!!log}
        date={date}
        onChangeDate={setDate}
      />
      <WriteEditor
        title={title}
        setTitle={setTitle}
        body={body}
        setBody={setBody}
      />
    </SafeAreaView>
  );
}

export default WriteScreen;

const styles = StyleSheet.create({
  block: {flex: 1, backgroundColor: 'white'},
});
