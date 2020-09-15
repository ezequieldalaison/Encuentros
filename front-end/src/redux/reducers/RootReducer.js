import { combineReducers } from "redux";
import ProfessionalReducer from "./General/ProfessionalReducer";
import MonthReducer from "./Common/MonthReducer";
import StudentReducer from "./Pilates/StudentReducer";
import WeeklyClassReducer from "./Pilates/WeeklyClassReducer";
import ApiStatusReducer from "./ApiStatus/ApiStatusReducer";
import FeeReducer from "./Pilates/FeeReducer";
import FeeTypeReducer from "./Pilates/FeeTypeReducer";
import AreaReducer from "./Common/AreaReducer";
import ClassReducer from "./Pilates/ClassReducer";
import ProfessionalWorkDayReducer from "./Pilates/ProfessionalWorkDayReducer";
import MovementReducer from "./General/MovementReducer";
import ProfessionalPaymentReducer from "./Pilates/ProfessionalPaymentReducer";
import ParameterReducer from "./Common/ParameterReducer";

const RootReducer = combineReducers({
  professional: ProfessionalReducer,
  students: StudentReducer,
  weeklyClasses: WeeklyClassReducer,
  apiCallsInProgress: ApiStatusReducer,
  fees: FeeReducer,
  feeTypes: FeeTypeReducer,
  months: MonthReducer,
  areas: AreaReducer,
  classes: ClassReducer,
  professionalWorkDays: ProfessionalWorkDayReducer,
  movements: MovementReducer,
  professionalPayments: ProfessionalPaymentReducer,
  parameters: ParameterReducer
});

export default RootReducer;
