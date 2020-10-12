import { handleResponse, handleError } from "../ApiUtils";
const baseUrl = process.env.REACT_APP_API + "movementStatus/";

export function getMovementStatuses() {
  return fetch(baseUrl, {
    method: "GET"
  })
    .then(handleResponse)
    .catch(handleError);
}
