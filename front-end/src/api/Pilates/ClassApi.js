import { handleResponse, handleError } from "../ApiUtils";
const baseUrl = process.env.REACT_APP_API + "class/";

export function getClassesByWeek(week) {
  return fetch(baseUrl + "week/" + week, {
    method: "GET"
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getClassByDateAndHour(dateHour) {
  return fetch(baseUrl + "getByCriteria", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(dateHour)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveClass(_class) {
  return fetch(baseUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(_class)
  })
    .then(handleResponse)
    .catch(handleError);
}
