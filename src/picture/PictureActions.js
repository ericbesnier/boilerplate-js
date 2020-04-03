import { STORAGE_API } from '../api/StorageApi';

export const FETCH_ALL_PICTURE = 'FETCH_ALL_PICTURE';
export const ADD_PICTURE = 'ADD_PICTURE';
export const REMOVE_PICTURE = 'REMOVE_PICTURE';
export const SET_INITIALIZED = 'SET_INITIALIZED';

export const setPictureAsInitialized = () => {
  // console.log('PictureActions/setPictureAsInitialized');
  return {
    type: SET_INITIALIZED,
  };
}

export const fetchAllPicture = () => {
  // console.log('PictureActions/fetchAllPicture');
  return {
    type: FETCH_ALL_PICTURE,
    payload: STORAGE_API.fetchAll()
  };
}

export const addPicture = (value) => {
  // console.log('PictureActions/addPicture');
  return {
    type: ADD_PICTURE,
    payload: STORAGE_API.add(value)
  };
}

export const removePicture = (id) => {
  // console.log('PictureActions/removePicture');
  return {
    type: REMOVE_PICTURE,
    payload: STORAGE_API.remove(id)
  };
}