import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { syncDecksAsync } from './actions';
import reducer from './reducers';

export default function configureStore() {
  const store = createStore(reducer, applyMiddleware(thunk));
  store.dispatch(syncDecksAsync());
  return store;
}
