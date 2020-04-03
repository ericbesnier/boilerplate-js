console.log('App...');
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import createStore from './src/redux/Store';
import Root from './Root';
import LoadingScreen from './src/commons/LoadingScreen';

export const { store, persistor } = createStore();

// c l a s s   A p p
//
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<LoadingScreen
          color="#00FF00"
          size="large"
          message="chargement du PersistGate" />}
        persistor={persistor} >
        <Root />
      </PersistGate>
    </Provider>
  );
}
