import { combineReducers } from "redux";
import ProfessionalReducer from "./ProfessionalReducer";

const RootReducer = combineReducers({
  professional: ProfessionalReducer
});

export default RootReducer;
