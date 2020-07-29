import { combineReducers } from "redux";
import peopleReducer from "./PeopleReducer";

const RootReducer = combineReducers({
  people: peopleReducer
});

export default RootReducer;
