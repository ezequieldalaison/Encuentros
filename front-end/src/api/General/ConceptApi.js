import { handleResponse, handleError } from "../ApiUtils";
// const baseUrl = process.env.API_URL + "/weeklyClass/";
const baseUrl = "http://localhost:5000/api/concept/";

export function getCommonConcepts(areaId) {
  return fetch(baseUrl + "common/" + areaId, {
    method: "GET"
  })
    .then(handleResponse)
    .catch(handleError);
}
