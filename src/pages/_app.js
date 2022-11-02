import '../styles/globals.css';
import '../styles/markdown.css';

import store from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';

let persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  return <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Component {...pageProps} />
    </PersistGate>
  </Provider>
}

export default MyApp
