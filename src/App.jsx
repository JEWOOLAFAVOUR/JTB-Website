import React from "react";
import Routes from "./routes";
import { ToastContainer } from "./components/utilis";
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import reduxStore from './redux/store';

export const reduxPersistStore = persistStore(reduxStore);


export default function App() {
  return (
    <>
      <Provider store={reduxStore}>
        <PersistGate persistor={reduxPersistStore}>
          <ToastContainer />
          <Routes />
        </PersistGate>
      </Provider>
    </>
  );
}
