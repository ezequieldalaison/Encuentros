import { handleResponse, handleError } from "../ApiUtils";
// const baseUrl = process.env.API_URL + "/weeklyClass/";
const baseUrl = "http://localhost:5000/api/class/";

export function getClassesByWeek(week) {
  return fetch(baseUrl + "week/" + week, {
    method: "GET"
  })
    .then(handleResponse)
    .catch(handleError);
}
