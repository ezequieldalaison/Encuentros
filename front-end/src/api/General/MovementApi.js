import { handleResponse, handleError } from "../ApiUtils";
// const baseUrl = process.env.API_URL + "/weeklyClass/";
const baseUrl = "http://localhost:5000/api/movement/";

export function getMovementsByMonth(monthId) {
  return fetch(baseUrl + "month/" + monthId, {
    method: "GET"
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveMovement(movement) {
  return fetch(baseUrl + (movement.id || ""), {
    method: movement.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(movement)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getMovement(movementId) {
  return fetch(baseUrl + movementId, {
    method: "GET"
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteMovement(movementId) {
  return fetch(baseUrl + movementId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
