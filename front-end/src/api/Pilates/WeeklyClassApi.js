import { handleResponse, handleError } from "../ApiUtils";
// const baseUrl = process.env.API_URL + "/weeklyClass/";
const baseUrl = "http://localhost:5000/api/weeklyClass/";

export function getWeeklyClasses() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function getWeeklyClass(weeklyClassId) {
  return fetch(baseUrl + weeklyClassId, {
    method: "GET"
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveWeeklyClass(weeklyClass) {
  return fetch(baseUrl + (weeklyClass.id || ""), {
    method: weeklyClass.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(weeklyClass)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function inactivateWeeklyClass(weeklyClassId) {
  return fetch(baseUrl + "inactivate/" + weeklyClassId, {
    method: "PUT",
    headers: { "content-type": "application/json" }
  })
    .then(handleResponse)
    .catch(handleError);
}

export function activateWeeklyClass(weeklyClassId) {
  return fetch(baseUrl + "activate/" + weeklyClassId, {
    method: "PUT",
    headers: { "content-type": "application/json" }
  })
    .then(handleResponse)
    .catch(handleError);
}

export function searchWeeklyClasses(criteria) {
  return fetch(baseUrl + "search", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(criteria)
  })
    .then(handleResponse)
    .catch(handleError);
}
