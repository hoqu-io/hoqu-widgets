import reduxStorage from './../../sdk/reduxStorage';
import payday from './../payday/reducers/payday';

const reducers = {
  payday,
};

export default reduxStorage(reducers);
