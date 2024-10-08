import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL;
export const api = axios.create({
  baseURL: apiURL,
  headers: { 'Content-Type': 'application/json' },
});

export const getApiURL = () => apiURL;
export const getResponseData = (resp) => resp.data;
export const escalateError = (err) => {
  let errorFromResponse;
  try {
    errorFromResponse = err.response.data.error.toString();
  } catch (e) {
    errorFromResponse = undefined;
  }
  const newErr = new Error(
    errorFromResponse
      || (err instanceof Error
        ? err.message || err.toString()
        : typeof err === 'string'
          ? err
          : err.toString() || 'Error Inesperado'),
  );
  try {
    newErr.data = err.response.data;
    // eslint-disable-next-line no-empty
  } catch (e) {}
  console.log(newErr);
};

export default api;