import * as Types from "../actions/ActionTypes";

export default function peopleReducer(state = [], action) {
  switch (action.type) {
    case Types.CREATE_PERSON_SUCCESS:
      return [...state, { ...action.person }];
    case Types.UPDATE_PERSON_SUCCESS:
      return state.map(person =>
        person.id === action.person.id ? action.person : person
      );
    case Types.GET_PEOPLE_SUCCESS:
      return action.people;
    case Types.INACTIVATE_PERSON_SUCCESS:
    case Types.ACTIVATE_PERSON_SUCCESS: {
      return state.map(person =>
        person.id === action.person.id ? action.person : person
      );
    }
    default:
      return state;
  }
}
