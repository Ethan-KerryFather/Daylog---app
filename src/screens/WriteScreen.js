import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import WriteHeader from '../../components/WriteHeader';
import WriteEditor from '../../components/WriteEditor';
import {useNavigation} from '@react-navigation/native';
import LogContext from '../../contexts/LogContext';

function WriteScreen() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigation = useNavigation();

  const {onCreate} = useContext(LogContext);

  const onSave = () => {
    onCreate({
      title,
      body,
      date: new Date().toISOString(),
    });
    navigation.pop();
  };

  return (
    <SafeAreaView style={styles.block}>
      <WriteHeader onSave={onSave} />
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
