import { applyMiddleware, createStore, combineReducers } from 'redux';
import { persistStore } from 'redux-persist';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import userReducer from '../user/UserReducer';
import pictureReducer from '../picture/PictureReducer';

const middlewares = [
  // Given a single action with an async payload, the middleware transforms 
  // the action to a separate pending action and a separate fulfilled/rejected action, 
  // representing the states of the async action.
  reduxPromiseMiddleware,
  // Redux Thunk middleware allows you to write action creators that return a function instead of an action.
  thunk,
];

const appReducers = combineReducers({
  user: userReducer,
  picture: pictureReducer,
});

export default () => {
  let store = createStore(
    appReducers,
    undefined,
    applyMiddleware(...middlewares),
  );
  persistor = persistStore(store);
  // if (persistor) {
  //   console.log('Store/RootReducer: persistStore  -----------------------------> A SUPPRIMER < ------------------------------------------');
  //   persistor.purge();
  // }
  return { store, persistor };
};