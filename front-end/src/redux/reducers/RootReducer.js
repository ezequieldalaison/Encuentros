import { combineReducers } from "redux";
import ProfessionalReducer from "./ProfessionalReducer";
import StudentReducer from "./Pilates/StudentReducer";

const RootReducer = combineReducers({
  professional: ProfessionalReducer,
  student: StudentReducer
});

export default RootReducer;
