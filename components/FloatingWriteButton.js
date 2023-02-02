import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {Platform, Pressable, StyleSheet, View, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function FloatingWriteButton({hidden}) {
  useEffect(() => {
    Animated.timing(animation, {
      toValue: hidden ? 1 : 0,
      useNativeDriver: true,
    }).start(() => {
      console.log('callback function');
    });
    return () => {
      console.log('floatingWriteBtn unmount | updated');
    };
  }, [hidden, animation]);

  const animation = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('Write');
  };

  return (
    <View style={styles.wrapper}>
      <Pressable
        style={({pressed}) => [styles.button]}
        android_ripple={{color: 'white'}}
        onPress={onPress}>
        <Icon name="add" size={24} style={styles.icon} />
      </Pressable>
    </View>
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
