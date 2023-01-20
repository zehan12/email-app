// External imports
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// Local imports
import rootReducer from "../reducers";

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);