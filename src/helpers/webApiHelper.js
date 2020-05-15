function getFetchArgs(options) {
  const headers = {
    'Content-Type': 'application/json'
  };
  let body;
  if (options.body) {
    if (options.type === 'GET') {
      throw new Error('GET request does not support request body.');
    }
    body = JSON.stringify(options.body);
  }
  return {
    method: options.type,
    headers,
    ...(options.request === 'GET' ? {} : { body })
  };
}

export function callApi(route, options = {}) {
  const url = process.env.API_URL + route;
  return fetch(url, getFetchArgs(options))
    .then(response =>
      response.ok ? response.json() : Promise.reject(Error('Failed to load'))
    )
    .catch(error => {
      throw error;
    });
}
