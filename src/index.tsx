/**
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Routes from './routes/index';

import Orientation from 'react-native-orientation';

const App = (): JSX.Element => {
  Orientation.lockToPortrait();

  return <Routes />;
};

export default App;
