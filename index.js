import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './src/storage/store';

import dayjs from 'dayjs';
require('dayjs/locale/es');
const utc = require('dayjs/plugin/utc')

dayjs.locale('es');
dayjs.extend(utc)

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(
  () => {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
);
