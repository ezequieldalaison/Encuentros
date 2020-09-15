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

export function getParametersByAreaId(areaId) {
  return fetch(baseUrl + "area/" + areaId, {
    method: "GET"
  })
    .then(handleResponse)
    .catch(handleError);
}

export function updateParameter(parameter) {
  return fetch(baseUrl + parameter.id, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(parameter)
  })
    .then(handleResponse)
    .catch(handleError);
}
