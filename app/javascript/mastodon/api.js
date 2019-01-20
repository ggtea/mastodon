import axios from 'axios';
import LinkHeader from 'http-link-header';
import ready from './ready';

export const getLinks = response => {
  const value = response.headers.link;

  if (!value) {
    return { refs: [] };
  }

  return LinkHeader.parse(value);
};

let csrfHeader = {};
function setCSRFHeader() {
  const csrfToken = document.querySelector('meta[name=csrf-token]').content;
  csrfHeader['X-CSRF-Token'] = csrfToken;
}
ready(setCSRFHeader);

export default getState => axios.create({
  headers: Object.assign(csrfHeader, getState ? {
    'Authorization': `Bearer ${getState().getIn(['meta', 'access_token'], '')}`,
  } : {}),

  baseURL: '/mstdn',
  
  transformResponse: [function (data) {
    try {
      return JSON.parse(data);
    } catch(Exception) {
      return data;
    }
  }],
});
