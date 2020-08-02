import { handleResponse, handleError } from "../ApiUtils";
// const baseUrl = process.env.API_URL + "/student/";
const baseUrl = "http://localhost:5000/api/student/";

export function getStudents() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveStudent(student) {
  return fetch(baseUrl + (student.id || ""), {
    method: student.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(student)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function inactivateStudent(studentId) {
  return fetch(baseUrl + "inactivate/" + studentId, {
    method: "PUT",
    headers: { "content-type": "application/json" }
  })
    .then(handleResponse)
    .catch(handleError);
}

export function activateStudent(studentId) {
  return fetch(baseUrl + "activate/" + studentId, {
    method: "PUT",
    headers: { "content-type": "application/json" }
  })
    .then(handleResponse)
    .catch(handleError);
}
