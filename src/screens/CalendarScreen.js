import React, {useContext, useRef, useState, useEffect} from 'react';
import {StyleSheet, View, Text, Animated, Button} from 'react-native';
import LogContext from '../../contexts/LogContext';

function SlideLeftAndRight() {
  const animation = useRef(new Animated.Value(0)).current;
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    console.log(`useEffect : enabled : ${enabled}`);
    Animated.timing(animation, {
      toValue: enabled ? 1 : 0,
      useNativeDriver: true,
    }).start(() => {});
  }, [enabled, animation]);

  return (
    <View>
      <Animated.View
        style={[
          styles.rectangle,
          {
            transform: [
              {
                translateX: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 150],
                }),
              },
            ],
            opacity: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
        ]}
      />
      <Button
        title="Toggle"
        onPress={() => {
          setEnabled(!enabled);
        }}
      />
    </View>
  );
}

function CalendarScreen() {
  return (
    <View style={styles.container}>
      <SlideLeftAndRight />
    </View>
  );
}

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  rectangle: {
    width: 100,
    height: 100,
    backgroundColor: 'black',
  },
});
