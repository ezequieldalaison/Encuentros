import { handleResponse, handleError } from "../ApiUtils";
// const baseUrl = process.env.API_URL + "/weeklyClass/";
const baseUrl = "http://localhost:5000/api/parameter/";

export function getParameter(parameterId) {
  return fetch(baseUrl + parameterId, {
    method: "GET"
  })
    .then(handleResponse)
    .catch(handleError);
}
