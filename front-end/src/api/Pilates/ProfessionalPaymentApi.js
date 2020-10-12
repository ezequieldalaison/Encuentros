import { handleResponse, handleError } from "../ApiUtils";
const baseUrl = process.env.REACT_APP_API + "professionalPayment/";

export function saveProfessionalPayment(professionalPayment) {
  return fetch(baseUrl + (professionalPayment.id || ""), {
    method: professionalPayment.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(professionalPayment)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function searchProfessionalPayments(criteria) {
  return fetch(baseUrl + "search", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(criteria)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getProfessionalPayment(professionalPaymentId) {
  return fetch(baseUrl + professionalPaymentId, {
    method: "GET"
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteProfessionalPayment(professionalPaymentId) {
  return fetch(baseUrl + professionalPaymentId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
