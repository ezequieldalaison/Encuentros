import { handleResponse, handleError } from "../ApiUtils";
// const baseUrl = process.env.API_URL + "/weeklyClass/";
const baseUrl = "http://localhost:5000/api/weeklyClass/";

export function getWeeklyClasses() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
