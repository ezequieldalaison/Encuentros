import { combineReducers } from "redux";
import ProfessionalReducer from "./Common/ProfessionalReducer";
import MonthReducer from "./Common/MonthReducer";
import StudentReducer from "./Pilates/StudentReducer";
import WeeklyClassReducer from "./Pilates/WeeklyClassReducer";
import ApiStatusReducer from "./ApiStatus/ApiStatusReducer";
import FeeReducer from "./Pilates/FeeReducer";
import FeeTypeReducer from "./Pilates/FeeTypeReducer";
import AreaReducer from "./Common/AreaReducer";

const RootReducer = combineReducers({
  professional: ProfessionalReducer,
  students: StudentReducer,
  weeklyClasses: WeeklyClassReducer,
  apiCallsInProgress: ApiStatusReducer,
  fees: FeeReducer,
  feeTypes: FeeTypeReducer,
  months: MonthReducer,
  areas: AreaReducer
});

export default RootReducer;
