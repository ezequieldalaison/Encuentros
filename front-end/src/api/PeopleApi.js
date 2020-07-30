import { handleResponse, handleError } from "./ApiUtils";
// const baseUrl = process.env.API_URL + "/people/";
const baseUrl = "http://localhost:5000/api/person/";

export function getPeople() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function savePerson(person) {
  return fetch(baseUrl + (person.id || ""), {
    method: person.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(person)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deletePerson(personId) {
  return fetch(baseUrl + personId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}

export function inactivatePerson(personId) {
  return fetch(baseUrl + "inactivate/" + personId, {
    method: "PUT",
    headers: { "content-type": "application/json" }
  })
    .then(handleResponse)
    .catch(handleError);
}

export function activatePerson(personId) {
  return fetch(baseUrl + "activate/" + personId, {
    method: "PUT",
    headers: { "content-type": "application/json" }
  })
    .then(handleResponse)
    .catch(handleError);
}
