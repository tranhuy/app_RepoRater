import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    // Get the access token for the storage
    const token = await AsyncStorage.getItem(`${this.namespace}:token`);

    return token ? token : null;
  }

  async setAccessToken(accessToken) {
    // Add the access token to the storage
    await AsyncStorage.setItem(`${this.namespace}:token`, accessToken);
  }

  async removeAccessToken() {
    // Remove the access token from the storage
    await AsyncStorage.removeItem(`${this.namespace}:token`);
  }
}

// TESTING STORAGE
// const authorizeUser = async () => {
//     const authStorage = new AuthStorage('storage test');
//     await authStorage.setAccessToken('huy123');
//     console.log(await authStorage.getAccessToken());
//     await authStorage.removeAccessToken();
// }

// authorizeUser();

// GETTING LIST OF KEY/VALUE PAIRS STORED IN ASYNCSTORAGE
// AsyncStorage.getAllKeys((err, keys) => {
//   AsyncStorage.multiGet(keys, (error, stores) => {
//     stores.map((result, i, store) => {
//       console.log({ [store[i][0]]: store[i][1] });
//       return true;
//     });
//   });
// });

export default AuthStorage;