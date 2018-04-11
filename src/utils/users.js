import axios from 'axios';

export const getAllIds = (url, token, results) => {
  let allIds = results ? results : [];
  let req = token ? (url + '?token=' + token) : url;
  return new Promise((resolve, reject) => {
    axios.get(req)
      .then((res) => {
        const ids = res.data.result;
        const token = res.data.token;
        allIds = allIds.concat(ids);
        resolve(token);
      });
  }).then((token) => {
    return token ? getAllIds(url, token, allIds) : allIds;
  });
};