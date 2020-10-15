import { handleResponse, handleError } from "../ApiUtils";
const baseUrl = process.env.REACT_APP_API + "professional/";

export function getProfessionals() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function getProfessional(professionalId) {
  return fetch(baseUrl + professionalId, {
    method: "GET"
  })
    .then(handleResponse)
    .catch(handleError);
}

export function searchProfessionals(criteria) {
  return fetch(baseUrl + "search", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(criteria)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getProfessionalsByArea(areaId) {
  return fetch(baseUrl + "area/" + areaId, {
    method: "GET"
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveProfessional(professional) {
  return fetch(baseUrl + (professional.id || ""), {
    method: professional.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(professional)
  })
    .then(handleResponse)
    .catch(handleError);
}

// export function deleteProfessional(professionalId) {
//   return fetch(baseUrl + professionalId, { method: "DELETE" })
//     .then(handleResponse)
//     .catch(handleError);
// }

export function inactivateProfessional(professionalId) {
  return fetch(baseUrl + "inactivate/" + professionalId, {
    method: "PUT",
    headers: { "content-type": "application/json" }
  })
    .then(handleResponse)
    .catch(handleError);
}

export function activateProfessional(professionalId) {
  return fetch(baseUrl + "activate/" + professionalId, {
    method: "PUT",
    headers: { "content-type": "application/json" }
  })
    .then(handleResponse)
    .catch(handleError);
}
