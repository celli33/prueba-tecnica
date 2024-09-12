import React from 'react';
import TaxProfiles from './components/TaxProfiles.js';
import store from './store/store.js';
import { Provider } from 'react-redux';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <TaxProfiles></TaxProfiles>
    </Provider>
  );
};

export default App;
