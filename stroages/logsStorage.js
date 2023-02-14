import AsyncStorage from '@react-native-async-storage/async-storage';

const key = 'logs';

const logsStorage = {
  async get() {
    try {
      const raw = await AsyncStorage.getItem(key);
      const parsed = JSON.parse(raw);
      console.log(parsed);
      return parsed;
    } catch (e) {
      // error
      throw new Error('failed to load logs');
    }
  },

  async set(data) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      throw new Error('failed to save logs');
    }
  },
};

export default logsStorage;
