import React, {useRef} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

function WriteEditor({title, body, setTitle, setBody}) {
  const bodyRef = useRef();

  return (
    <View style={styles.block}>
      <TextInput
        placeholder="제목을 입력하세요"
        placeholderTextColor="black"
        style={styles.titleInput}
        returnKeyType="next"
        // returnKeyType?
        onChangeText={setTitle}
        value={title}
        onSubmitEditing={() => {
          bodyRef.current.focus();
        }}
      />
      <TextInput
        placeholder="당신의 오늘을 기록해보세요"
        placeholderTextColor="black"
        style={styles.bodyInput}
        multiline
        onChangeText={setBody}
        textAlignVertical="top"
        value={body}
        ref={bodyRef}
      />
    </View>
  );
}

export default WriteEditor;

const styles = StyleSheet.create({
  block: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    paddingVertical: 0,
    fontSize: 18,
    marginBottom: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
  bodyInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    color: '#263238',
  },
});
