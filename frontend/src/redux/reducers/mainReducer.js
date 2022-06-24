import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
// import filtroReducer from "./filtroReducer";
// import authReducer from "./authReducer:"
import intinerariesReducer from "./intinerariesReducer";

const mainReducer = combineReducers({
    citiesReducer, intinerariesReducer
})

export default mainReducer






