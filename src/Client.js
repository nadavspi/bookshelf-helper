const api = {
  key: process.env.REACT_APP_KEY,
  url: 'https://www.googleapis.com/books/v1/volumes',
};

function search(query) {
  return fetch(`${api.url}?q=${query}&key=${api.key}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON);
}

function lookup(volumeId) {
  return fetch(`${api.url}/${volumeId}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

const Client = { search, lookup };
export default Client;
