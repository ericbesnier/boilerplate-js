// import { AsyncStorage } from 'react-native';
// var shortid = require('shortid');
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");

// S t o r a g e A p i
// -------------------
class StorageApi {
  constructor() {
    // this.clearAsyncStorageAppData();
    this.createSqlitePicturesTable();
    // this.deleteAll();
  }

  // ---------------------------------------------------------------------------------------------
  //                                      s q l i t e
  // ---------------------------------------------------------------------------------------------

  // i n t e r f a c e
  // -----------------

  createSqlitePicturesTable = async () => {
    return await new Promise((resolve, reject) => {
      db.transaction(tx =>
        tx.executeSql(
          "create table if not exists pictures (id integer primary key not null, picture text);",
          [],
          (result) => resolve(result),
          (tx, error) => reject({ tx, error })),
        () => console.error('StorageApi/createSqlitePicturesTable: error transaction: ', error),
        () => console.log('StorageApi/createSqlitePicturesTable: success transaction'),
      );
    });
  }

  deleteAll = async () => {
    console.log('StorageApi/deleteAll -----------------------------> A SUPPRIMER < ------------------------------------------')
    return await new Promise((resolve, reject) => {
      db.transaction(
        tx => this._deleteAllSqlite(tx),
        (error) => console.error('StorageApi/deleteAll: échec transaction ! error=', error),
        null, // () => console.log('StorageApi/deleteAll: transaction réalisée avec succès'),
      );
    });
  }

  add = async (pictureBase64) => {
    // console.log('StorageApi/add')
    return await new Promise((resolve, reject) => {
      db.transaction(
        tx => this._addSqliteItem(tx, pictureBase64),
        (error) => console.error('StorageApi/add: échec transaction ! error=', error),
        null // () => console.log('StorageApi/add: transaction réalisée avec succès'),
      );
      db.transaction(
        tx => this._fetchAllSqlite(tx, resolve, reject),
        (error) => console.error('StorageApi/add: échec transaction ! error=', error),
        null,  // () => console.log('StorageApi/add: transaction réalisée avec succès'),
      );
    });
  }

  fetchAll = async () => {
    return await new Promise((resolve, reject) => {
      db.transaction(
        tx => this._fetchAllSqlite(tx, resolve, reject),
        (error) => console.error('StorageApi/fetchAll: échec transaction ! error=', error),
        null // () => console.log('StorageApi/fetchAll: transaction réalisée avec succès'),
      );
    });
  }

  remove = async (id) => {
    return await new Promise((resolve, reject) => {
      db.transaction(
        tx => this._removeSqlite(tx, id),
        (error) => console.error('StorageApi/remove: échec transaction ! error=', error),
        null // () => console.log('StorageApi/fetchAll: transaction réalisée avec succès'),
      );
      db.transaction(
        tx => this._fetchAllSqlite(tx, resolve, reject),
        (error) => console.error('StorageApi/remove: échec transaction ! error=', error),
        () => console.log('StorageApi/remove: transaction réalisée avec succès'),
      );
    });
  }

  // u t i l i t a i r e s   s q l S t a t e m e n t
  // -----------------------------------------------

  _deleteAllSqlite = async (tx) => {
    tx.executeSql(
      "delete from pictures",
      [],
      null, // (_, resultSet) => console.log('StorageApi/_deleteAllSqlite: resultSet=', resultSet),
      (_, error) => console.error('StorageApi/_deleteAllSqlite: error=', error)
    )
  }

  _addSqliteItem = async (tx, pictureBase64) => {
    tx.executeSql(
      "insert into pictures (picture) values (?)",
      [pictureBase64],
      null, // (_, resultSet) => console.log('StorageApi/_addSqliteItem: resultSet=', resultSet),
      (_, error) => console.error('StorageApi/_addSqliteItem: error=', error)
    )
  }

  _fetchAllSqlite = async (tx, resolve, reject) => {
    tx.executeSql(
      "select * from pictures",
      [],
      (_, resultSet) => {
        resolve(resultSet);
      },
      (_, error) => {
        console.error('StorageApi/_fetchAllSqlite: error=', error);
        reject(error);
      }
    )
  }

  _removeSqlite = async (tx, id) => {
    tx.executeSql(
      "delete from pictures where id = ?",
      [id],
      (_, resultSet) => console.log('StorageApi/_removeSqlite: resultSet=', resultSet),
      (_, error) => console.error('StorageApi/_removeSqlite: error=', error)
    )
  }
}
  export const STORAGE_API = new StorageApi();


  // A s y n c S t o r a g e
  // -----------------------
  /*
  clearAsyncStorageAppData = async function () {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error('Error clearing app data.');
    }
  }

  getAsyncStorageItem = async (key) => {
    try {
      const response = await AsyncStorage.getItem(key);
      if (response !== null) {
        console.log('StorageApi/getAsyncStorageItem: response=:', response);
        return response;
      }
    } catch (error) {
      console.warn('StorageApi/getAsyncStorageItem: error=:', error);
    }
  }

  addAsyncStorageItem = async (data) => {
    // console.log('StorageApi/addAsyncStorageItem: data=:', data);
    let key = shortid.generate();
    console.log('StorageApi/addAsyncStorageItem: key=:', key);
    try {
      await AsyncStorage.setItem(key, data);
      return { key: key, data: data };
    } catch (error) {
      console.warn('StorageApi/addAsyncStorageItem: error=:', error);
    }
  }

  removeAsyncStorageItem = async (key) => {
    try {
      const response = await AsyncStorage.removeItem(key);
      if (response !== null) {
        console.log('StorageApi/removeAsyncStorageItem: response=:', response);
        return response;
      }
    } catch (error) {
      console.warn('StorageApi/removeAsyncStorageItem: error=:', error);
    }
  }

  clearAsyncStorage = async () => {
    try {
      const response = await AsyncStorage.clear()
      if (response !== null) {
        console.log('StorageApi/clearAsyncStorage: response=:', response);
        return response;
      }
    } catch (error) {
      console.warn('StorageApi/clearAsyncStorage: error=:', error);
    }
  }
  */
