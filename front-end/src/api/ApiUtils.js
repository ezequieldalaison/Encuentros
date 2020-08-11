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

// In a real app, would likely call an error logging service.
export function handleError(error) {
  var parsedError = JSON.parse(error.message);
  if (parsedError && parsedError.status === 400 && parsedError.detail)
    toast.error(parsedError.detail);
  else {
    // eslint-disable-next-line no-console
    toast.error("No se pudo establecer conexión con el servidor.");
  }
  throw error;
}
