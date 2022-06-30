import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
// import filtroReducer from "./filtroReducer";
// import authReducer from "./authReducer:"
import intinerariesReducer from "./intinerariesReducer";
 import usersReducers from "./usersReducers";

const mainReducer = combineReducers({
    citiesReducer, intinerariesReducer, usersReducers
});

export default mainReducer






