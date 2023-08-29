//export const baseUrl = "https://auth.nomoreparties.co";
export const baseUrl = "http://localhost:3001";
export function register(email, password) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
}
export function authorize(email, password) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
}

export function checkToken() {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
     // Authorization: `Bearer ${'jwt'}`, //`Bearer ${'jwt'}`,
    },
  }).then(checkResponse);
}

export function logout() {
  return fetch(`${baseUrl}/signout`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res);
  }
}
