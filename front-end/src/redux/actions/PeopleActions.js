import * as Types from "./ActionTypes";
import * as PeopleApi from "../../api/PeopleApi";

export function getPeopleSuccess(people) {
  return { type: Types.GET_PEOPLE_SUCCESS, people };
}

export function createPersonSuccess(person) {
  return { type: Types.CREATE_PERSON_SUCCESS, person };
}

export function updatePersonSuccess(person) {
  return { type: Types.UPDATE_PERSON_SUCCESS, person };
}

export function getPeople() {
  return function(dispatch) {
    return PeopleApi.getPeople()
      .then(people => {
        dispatch(getPeopleSuccess(people));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function savePerson(person) {
  return function(dispatch) {
    return PeopleApi.savePerson(person)
      .then(savedPerson => {
        person.id
          ? dispatch(updatePersonSuccess(savedPerson))
          : dispatch(createPersonSuccess(savedPerson));
      })
      .catch(error => {
        throw error;
      });
  };
}
