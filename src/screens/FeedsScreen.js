import React, {useContext} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import FloatingWriteButton from '../../components/FloatingWriteButton';
import LogContext from '../../contexts/LogContext';

function FeedScreen() {
  const {logs} = useContext(LogContext);
  console.log(JSON.stringify(logs, null, 2));
  return (
    <View style={styles.block}>
      {logs.map(element => (
        <Text key={element.id}>{element.title}</Text>
      ))}
      <FloatingWriteButton />
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
