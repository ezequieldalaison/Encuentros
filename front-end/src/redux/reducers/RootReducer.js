import { combineReducers } from "redux";
import ProfessionalReducer from "./ProfessionalReducer";
import StudentReducer from "./Pilates/StudentReducer";

const RootReducer = combineReducers({
  professional: ProfessionalReducer,
  students: StudentReducer
});

export default RootReducer;
