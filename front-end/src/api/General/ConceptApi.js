import { handleResponse, handleError } from "../ApiUtils";
const baseUrl = process.env.REACT_APP_API + "concept/";

export function getCommonConcepts(areaId) {
  return fetch(baseUrl + "common/" + areaId, {
    method: "GET"
  })
    .then(handleResponse)
    .catch(handleError);
}
