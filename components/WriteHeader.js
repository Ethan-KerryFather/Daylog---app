import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import TransparentCircleButton from './TransparentCircleButton';
import format from 'date-fns/format';
import ko from 'date-fns/locale/ko';
import DatetimepickerModal from 'react-native-modal-datetime-picker';

function WriteHeader({onSave, onAskRemove, isEditing, date, onChangeDate}) {
  // variable, constant

  const navigation = useNavigation();

  const [mode, setMode] = useState('date');
  const [visible, setVisible] = useState(false);

  // function
  function onGoBack() {
    navigation.pop();
  }

  function onPressDate() {
    setMode('date');
    setVisible(true);
  }

  function onPressTime() {
    setMode('time');
    setVisible(true);
  }

  function onConfirm(selectedDate) {
    setVisible(false);
    onChangeDate(selectedDate);
  }

  function onCancel() {
    setVisible(false);
  }

  return (
    <View style={styles.block}>
      <View style={styles.iconButtonWrapper}>
        <TransparentCircleButton
          name="arrow-back"
          color="#424242"
          onPress={onGoBack}
        />
      </View>

      <View style={styles.center}>
        <Pressable onPress={onPressDate}>
          <Text style={styles.normalText}>
            {format(new Date(date), 'PPP', {
              locale: ko,
            })}
          </Text>
        </Pressable>
        <View style={styles.normalText} />
        <Pressable onPress={onPressTime}>
          <Text style={{color: 'black'}}>
            {' '}
            {format(new Date(date), 'p', {locale: ko})}
          </Text>
        </Pressable>
      </View>
      <View style={styles.buttons}>
        {isEditing && (
          <TransparentCircleButton
            name="delete"
            color="#ef5350"
            hasMarginRight={true}
            onPress={onAskRemove}
          />
        )}

        <TransparentCircleButton
          name="check"
          color="#ef5350"
          onPress={onSave}
        />
      </View>
      <DatetimepickerModal
        isVisible={visible}
        mode={mode}
        onConfirm={onConfirm}
        onCancel={onCancel}
        date={date}
      />
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

  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
    flexDirection: 'row',
  },

  separator: {
    width: 8,
  },

  //
  normalText: {
    color: 'black',
  },
});
