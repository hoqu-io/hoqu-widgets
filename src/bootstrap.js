import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import App from './app/app';
import storage from './app/storage';

import bootstrap from './../sdk/bootstrap';

const app = () => {
  return ReactDom.render(
    <Provider store={storage()}>
      <App />
    </Provider>,
    document.querySelector('#app')
  );
};

bootstrap(app);
