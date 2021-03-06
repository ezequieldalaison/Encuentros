import { handleResponse, handleError } from "../ApiUtils";
const baseUrl = process.env.REACT_APP_API + "feeType/";

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

export function updateFeeTypes(feeTypes) {
  return fetch(baseUrl + "list", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(feeTypes)
  })
    .then(handleResponse)
    .catch(handleError);
}
