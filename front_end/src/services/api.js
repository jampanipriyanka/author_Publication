/**
 * Description: based on the components we build , we created the service calls 
 *
 * @author Om prakash and saiTharun
 * @lastModified 2023-11-29 LastModifiedDate
 */
const BASE_URL = 'http://localhost:3002';
let requestOptions = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        'content-type': 'application/json'
    }
};

export function storeFormData(endpoint, payload) {
  const options = {
    method: 'POST',
    headers: requestOptions.headers,
    body: JSON.stringify(payload)
  }
  return fetch(`${BASE_URL}/${endpoint}`, options).then((response => {
    return response.json();
  })).catch((error) => {
    throw new Error("Publication API request failed: ", error)
  })
}

export function getAllPublications(endpoint) {
  const options = JSON.parse(JSON.stringify(requestOptions));
  options['method'] = 'GET';
  return fetch(`${BASE_URL}/${endpoint}`, options).then((response => {
    return response.json();
  })).catch((error) => {
    throw new Error("Get all publications API request failed: ", error)
  })
}

export function getAllAuthors(endpoint) {
  const options = JSON.parse(JSON.stringify(requestOptions));
  options['method'] = 'GET';
  return fetch(`${BASE_URL}/${endpoint}`, options).then((response => {
    return response.json();
  })).catch((error) => {
    throw new Error("Get all Authors API request failed: ", error)
  })
}

export function getAllDepartments(endpoint) {
  const options = JSON.parse(JSON.stringify(requestOptions));
  options['method'] = 'GET';
  return fetch(`${BASE_URL}/${endpoint}`, options).then((response => {
    return response.json();
  })).catch((error) => {
    throw new Error("Get all Departments API request failed: ", error)
  })
}

export function getAllInstitutions(endpoint) {
  const options = JSON.parse(JSON.stringify(requestOptions));
  options['method'] = 'GET';
  return fetch(`${BASE_URL}/${endpoint}`, options).then((response => {
    return response.json();
  })).catch((error) => {
    throw new Error("Get all Institutions API request failed: ", error)
  })
}
