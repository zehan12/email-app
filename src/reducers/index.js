import { combineReducers } from "redux";
import emailReducer from "./emailReducer";

const rootReducer = ( ) => {
    email: emailReducer;
}

export default rootReducer;