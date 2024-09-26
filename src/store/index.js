import { legacy_createStore } from "redux";

import rootReducer from "./modules/rootReducer";

const store = legacy_createStore(rootReducer);

export default store;
