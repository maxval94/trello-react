const makeRequest = (url, options) => {
  const headers = new Headers({
    "Content-Type": "application/json"
  });

  return fetch(url, {
    credentials: "same-origin",
    headers,
    ...options
  }).then(response => {
    return response.json();
  });
};

export { makeRequest };
