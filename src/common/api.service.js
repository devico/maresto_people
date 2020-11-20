import { Base64 } from 'js-base64';

function handleResponse(response) {
  if (response.status === 204) {
    return "";
  } else if (response.status === 404) {
    return null;
  } else {
    // console.log('RS:', response.json())
    return response;
  }
}


function apiService(endpoint, method, data) {
  // D.R.Y. code to make HTTP requests to the REST API backend using fetch
  // const token = '0JTQvNC40YLRgNCw0LrQvtCyINChLtCdLjozNDAzNDAzNDA='
  const username = 'Дмитраков С.Н.';
  const password = '340340340';

  // let headers = new Headers();
  // headers.set('Authorization', `Basic ${Base64.encode(username + ":" + password)}`)
  const config = {
    method: method || "GET",
    // body: data !== undefined ? JSON.stringify(data) : null,
    // mode: 'no-cors',
    headers: {
      // 'Access-Control-Allow-Origin': '*',
      "content-type": "application/json",
      "Authorization": `Basic ${Base64.encode(username + ":" + password)}`,
    },
    withCredentials: true,
    credentials: 'same-origin',
  };

  return fetch(endpoint, config)
    .then(response => {
      return response.json();
    }).then( data => {
      // console.log(data);
    });
}

export { apiService };
