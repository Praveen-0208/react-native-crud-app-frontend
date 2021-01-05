import {applyMiddleware, createStore} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import {logger} from 'redux-logger';
let middlewares = [];
middlewares.push(thunk);
middlewares.push(promise);
middlewares.push(logger);

export default createStore(rootReducer, {}, applyMiddleware(...middlewares));
