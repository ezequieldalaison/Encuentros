import { toast } from "react-toastify";

export async function handleResponse(response) {
  if (response.ok) return response.json();
  if (response.status === 400) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error("Network response was not ok.");
}

export async function handleFileResponse(response) {
  if (response.ok) {
    response.blob().then(blob => {
      var file = window.URL.createObjectURL(blob);
      //window.location.assign(file);
      window.open(file);
    });
  }

  if (response.status === 400) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = await response.text();
    throw new Error(error);
  }
}

// In a real app, would likely call an error logging service.
export function handleError(error) {
  var parsedError;
  try {
    parsedError = JSON.parse(error.message);
  } catch (e) {
    console.log(e);
  }

  if (parsedError && parsedError.status === 400 && parsedError.detail)
    toast.error(parsedError.detail);
  else {
    // eslint-disable-next-line no-console
    toast.error("No se pudo establecer conexión con el servidor.");
  }
  throw error;
}
