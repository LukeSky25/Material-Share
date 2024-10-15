import { persistStore } from 'redux-persist';
import { applyMiddleware, legacy_createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { thunk } from 'redux-thunk';

import rootReducer from "./modules/rootReducer";
import rootSaga from "./modules/rootSaga";
import persistedReducers from './modules/reduxPersist';

const sagaMiddleware = createSagaMiddleware();

const store = legacy_createStore(
  persistedReducers(rootReducer),
  applyMiddleware(sagaMiddleware, thunk)
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;
