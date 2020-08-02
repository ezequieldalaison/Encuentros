import { handleResponse, handleError } from "../ApiUtils";
// const baseUrl = process.env.API_URL + "/professional/";
const baseUrl = "http://localhost:5000/api/student/";

export function getStudents() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
