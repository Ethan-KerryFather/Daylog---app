import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {Platform, Pressable, StyleSheet, View, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function FloatingWriteButton({hidden}) {
  // variable / constant
  const animation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  // hook
  useEffect(() => {
    Animated.spring(animation, {
      toValue: hidden ? 1 : 0,
      useNativeDriver: true,
      // 강도 ( 기본값 40 )
      tension: 45,
      // 감속 ( 기본값 7 )
      friction: 5,
      // speed : 속도, bounciness : 탄력성
    });
  }, [animation, hidden]);

  // function
  const onPress = () => {
    navigation.navigate('Write');
  };

  //
  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 88],
              }),
            },
          ],
          opacity: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        },
      ]}>
      <Pressable
        style={({pressed}) => [
          styles.button,
          Platform.OS === 'ios' && {
            opacity: pressed ? 0.6 : 1,
          },
        ]}
        android_ripple={{color: 'white'}}
        onPress={onPress}>
        <Icon name="add" size={24} style={styles.icon} />
      </Pressable>
    </Animated.View>
  );
}

export default FloatingWriteButton;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    elavation: 5,
    overflow: Platform.select({android: 'hidden'}),
  },
  icon: {
    color: 'white',
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#009688',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
