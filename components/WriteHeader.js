import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import TransparentCircleButton from './TransparentCircleButton';

function WriteHeader({onSave}) {
  const navigation = useNavigation();

  const onGoBack = () => {
    // 뒤로가기
    navigation.pop();
  };

  return (
    <View style={styles.block}>
      <View style={styles.iconButtonWrapper}>
        <TransparentCircleButton
          name="arrow-back"
          color="#424242"
          onPress={onGoBack}
        />
      </View>
      <View style={styles.buttons}>
        <TransparentCircleButton
          name="delete"
          color="#ef5350"
          hasMarginRight={true}
        />
        <TransparentCircleButton
          name="check"
          color="#ef5350"
          onPress={onSave}
        />
      </View>
    </View>
  );
}

export default WriteHeader;

const styles = StyleSheet.create({
  block: {
    height: 48,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
