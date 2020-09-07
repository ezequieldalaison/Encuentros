import { handleResponse, handleError } from "../ApiUtils";
// const baseUrl = process.env.API_URL + "/weeklyClass/";
const baseUrl = "http://localhost:5000/api/movement/";

export function getMovementsByMonth(monthId) {
  return fetch(baseUrl + "month/" + monthId, {
    method: "GET"
  })
    .then(handleResponse)
    .catch(handleError);
}