console.log('pictureReducer...');
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import {
  SET_INITIALIZED,
  FETCH_ALL_PICTURE,
  ADD_PICTURE,
  REMOVE_PICTURE,
} from './PictureActions';

const INITIAL_STATE = {
  pictures: [],
  SET_INITIALIZED: false,
  isPending: null,
  isFulfilled: null,
  isRejected: null,
  error: null
}

const pictureReducer = (state = INITIAL_STATE, action) => {
  // console.log('pictureReducer: state=', state);
  switch (action.type) {
    case SET_INITIALIZED:
      console.log('pictureReducer: action.type=', action.type);
      return {
        ...state,
        SET_INITIALIZED: true,
      };
    case `${FETCH_ALL_PICTURE}_PENDING`:
      console.log('pictureReducer: action.type=', action.type);
      return {
        ...state,
        isPending: true,
      };
    case `${FETCH_ALL_PICTURE}_FULFILLED`:
      console.log('pictureReducer: action.type=', action.type);
      // console.log('pictureReducer: action.payload=', action.payload);
      return {
        ...state,
        pictures: action.payload.rows._array,
        isPending: false,
      };
    case `${FETCH_ALL_PICTURE}_REJECTED`:
      console.log('pictureReducer: action.type=', action.type);
      return {
        ...state,
        isPending: false,
        error: {
          on: true,
          message: 'Error when get picture !',
        },
      };
    case `${ADD_PICTURE}_PENDING`:
      console.log('pictureReducer: action.type=', action.type);
      return {
        ...state,
        isPending: true,
      };
    case `${ADD_PICTURE}_FULFILLED`:
      console.log('pictureReducer: action.type=', action.type);
      // console.log('pictureReducer: action.payload=', action.payload);
      // console.log('pictureReducer: action.payload.data=', action.payload.data);
      return {
        ...state,
        // pictures: [...state.pictures, action.payload],
        pictures: action.payload.rows._array,
        isPending: false,
      };
    case `${ADD_PICTURE}_REJECTED`:
      console.log('pictureReducer: action.type=', action.type);
      return {
        ...state,
        isPending: false,
        error: {
          on: true,
          message: 'Error when set picture !',
        },
      };
    case `${REMOVE_PICTURE}_PENDING`:
      console.log('pictureReducer: action.type=', action.type);
      return {
        ...state,
        isPending: true,
      };
    case `${REMOVE_PICTURE}_FULFILLED`:
      console.log('pictureReducer: action.type=', action.type);
      console.log('pictureReducer: action.payload=', action.payload);
      return {
        ...state,
        pictures: action.payload.rows._array,
        isPending: false,
      };
    case `${REMOVE_PICTURE}_REJECTED`:
      console.log('pictureReducer: action.type=', action.type);
      return {
        ...state,
        isPending: false,
        error: {
          on: true,
          message: 'Error when remove picture  !',
        },
      };
    default:
      return state;
  }
}

const persistConfig = {
  key: 'picture',
  storage: storage,
  whitelist: ['SET_INITIALIZED'] // only SET_INITIALIZED will be persisted
};

export default persistReducer(persistConfig, pictureReducer);