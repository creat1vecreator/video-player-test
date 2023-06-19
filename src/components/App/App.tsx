import React, { FC } from 'react';
import { Provider } from 'react-redux';

import { AppRouter } from '@/router';
import store from '@/store';

export const App: FC = () => {
  return (
    <div className="App">
      {/* <Provider store={store}> */}
      <AppRouter />
      {/* </Provider> */}
    </div>
  );
};
