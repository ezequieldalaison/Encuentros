import { handleResponse, handleError } from "../ApiUtils";
// const baseUrl = process.env.API_URL + "/weeklyClass/";
const baseUrl = "http://localhost:5000/api/area/";

export function getAreas() {
  return fetch(baseUrl, {
    method: "GET"
  })
    .then(handleResponse)
    .catch(handleError);
}
