import AppConfig from 'AppConfig';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { reducer as formReducer } from 'redux-form';

const storage = additionalReducers => () => {
  const middlewares = [thunkMiddleware];

  if (true || AppConfig.env !== 'production') {
    middlewares.push(createLogger());
  }

  const reducers = {
    form: formReducer,
    ...additionalReducers
  };

  return createStore(
    combineReducers(reducers),
    applyMiddleware(...middlewares)
  );
};

export default storage;
