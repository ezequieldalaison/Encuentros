import { handleResponse, handleError } from "../ApiUtils";
// const baseUrl = process.env.API_URL + "/weeklyClass/";
const baseUrl = "http://localhost:5000/api/feeType/";

export function getFeeTypes() {
  return fetch(baseUrl, {
    method: "GET"
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getFeeType(feeTypeId) {
  return fetch(baseUrl + feeTypeId, {
    method: "GET"
  })
    .then(handleResponse)
    .catch(handleError);
}