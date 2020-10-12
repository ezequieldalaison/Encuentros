import { handleResponse, handleError } from "../ApiUtils";
const baseUrl = process.env.REACT_APP_API + "fee/";

export function searchFees(criteria) {
  return fetch(baseUrl + "search", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(criteria)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveFee(fee) {
  return fetch(baseUrl + (fee.id || ""), {
    method: fee.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(fee)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getFee(feeId) {
  return fetch(baseUrl + feeId, {
    method: "GET"
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteFee(feeId) {
  return fetch(baseUrl + feeId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
