import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeStringData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(`saving error: ${e}`);
  }
};

export const storeObjectData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(`saving error: ${e}`);
  }
};

export const getStringData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    console.log(`error reading value: ${e}`);
  }
};

export const getObjectData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(`error reading value: ${e}`);
  }
};

export const removeItemStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (exception) {
    console.log(exception);
  }
};
