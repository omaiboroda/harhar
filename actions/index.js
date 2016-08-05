import { save } from '../api/file.js';
import validate from 'har-validator';

export const CHANGE_HAR = 'CHANGE_HAR';
export const VALIDATE_HAR = 'VALIDATE_HAR';
export const UPLOAD_FILE = 'UPLOAD_FILE';
export const RECEIVE_URL = 'RECEIVE_URL';
export const REQUEST_URL = 'REQUEST_URL';

const WEB_SERVICE_URL = 'http://www.softwareishard.com/har/viewer?inputUrl=';

function validateHar(isValid) {
  return {
    type: VALIDATE_HAR,
    isValid,
  };
}

function startValidateHar(har) {
  return dispatch => {
    dispatch(changeHar(har));
    let parsedHar;
    try {
      parsedHar = JSON.parse(har);
    } catch (e) {
      return dispatch(validateHar(false));
    }
    return validate(parsedHar)
    .then(() => dispatch(validateHar(true)))
    .catch(() => dispatch(validateHar(false)));
  };
}


function changeHar(har) {
  return {
    type: CHANGE_HAR,
    har,
  };
}

export function changeAndValidateHar(har) {
  return startValidateHar(har);
}

export function uploadFile(file) {
  return {
    type: UPLOAD_FILE,
    file,
  };
}

function requestUrl() {
  return {
    type: REQUEST_URL,
  };
}


function makefile(string) {
  const str = `onInputData(${string})`;
  const bytes = [];

  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}

function shortenUrl(url) {
  return fetch('https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyBeKJJ0bsnpXllLbdix7ZJqjDLwMkpU5AY', {
    method: 'POST',
    body: JSON.stringify({ longUrl: formatUrl(url) }),
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  })
  .then(resp => resp.json());
}

function formatUrl(url) {
  return WEB_SERVICE_URL + url;
}

function receiveUrl(url) {
  return {
    type: RECEIVE_URL,
    url,
  };
}

export function upload(har) {
  return dispatch => {
    dispatch(requestUrl());
    return save(makefile(har))
      .then(url => shortenUrl(url))
      .then(resp => dispatch(receiveUrl(resp.id)));
  };
}
