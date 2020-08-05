import { combineReducers } from "redux";
import ProfessionalReducer from "./ProfessionalReducer";
import StudentReducer from "./Pilates/StudentReducer";
import WeeklyClassReducer from "./Pilates/WeeklyClassReducer";

const RootReducer = combineReducers({
  professional: ProfessionalReducer,
  students: StudentReducer,
  weeklyClasses: WeeklyClassReducer
});

export default RootReducer;
