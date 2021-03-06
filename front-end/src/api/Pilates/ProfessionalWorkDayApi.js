import { handleResponse, handleError } from "../ApiUtils";
const baseUrl = process.env.REACT_APP_API + "professionalWorkDay/";

export function getSuggestedProfessionals(dayId) {
  return fetch(baseUrl + "suggestedProfessionals/" + dayId, {
    method: "GET"
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveProfessionalWorkDay(pwd) {
  return fetch(baseUrl + (pwd.id || ""), {
    method: pwd.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(pwd)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveProfessionalWorkDays(pwds) {
  return fetch(baseUrl + "list", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(pwds)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getProfessionalWorkDaysByMonth(monthId) {
  return fetch(baseUrl + "month/" + monthId, {
    method: "GET"
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getProfessionalWorkDaysByYear(year) {
  return fetch(baseUrl + "year/" + year, {
    method: "GET"
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getProfessionalWorkedHoursByMonth(criteria) {
  return fetch(baseUrl + "workedHours", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(criteria)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getProfessionalWorkDay(getProfessionalWorkDayId) {
  return fetch(baseUrl + getProfessionalWorkDayId, {
    method: "GET",
    headers: { "content-type": "application/json" }
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteProfessionalWorkDay(professionalWorkDayId) {
  return fetch(baseUrl + professionalWorkDayId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
