import { handleResponse, handleError } from "../ApiUtils";
const baseUrl = process.env.REACT_APP_API + "area/";

export function getAreas() {
  return fetch(baseUrl, {
    method: "GET"
  })
    .then(handleResponse)
    .catch(handleError);
}
