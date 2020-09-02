import axios from 'axios';
const qs = require('qs');

import { RequestModel } from './models';

export const axiosRequest = async ({ type, url, params }: RequestModel) => {
  let req = null
  switch (type) {
    case 'get':
      req = axios.get(url)
      break
    case 'post':
      req = axios({
        data: params ? qs.stringify(params) : {},
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        url,
      })
      break
    default:
      req = axios.get(url)
  }
  const res = await req
    .then(({ status, data }: any) => {
      if (status === 200 && !data.code) {
        return data.data
      }
      return 0
    })
    .catch((error) => {
      console.log('axios error', url + error);
      return 0
    });
  return res
}