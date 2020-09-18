import { handleResponse, handleError } from "../ApiUtils";
// const baseUrl = process.env.API_URL + "/weeklyClass/";
const baseUrl = "http://localhost:5000/api/professionalPayment/";

export function saveProfessionalPayment(professionalPayment) {
  return fetch(baseUrl + (professionalPayment.id || ""), {
    method: professionalPayment.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(professionalPayment)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getProfessionalPaymentsPerMonth(monthId) {
  return fetch(baseUrl + "month/" + monthId, {
    method: "GET"
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
