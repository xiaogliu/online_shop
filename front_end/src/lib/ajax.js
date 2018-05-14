import axios from 'axios';
import conf from '../config/conf';

const host = conf.server_host;

/**
 * 发送网络请求
 *
 * @param method            HTTP Status
 * @param url               URL
 * @param bodyParams        HTTP Body
 * @param urlParams         URL Params
 * @returns {AxiosPromise}
 */
export default function(method, url, { bodyParams = {}, urlParams = {} }) {
  // 是否存在Access Token，存在则写入HTTP头
  const headers = {};
  try {
    const accessToken = sessionStorage.getItem('AccessToken');
    const userID = sessionStorage.getItem('UserID');
    if (accessToken && userID) {
      headers.AccessToken = accessToken;
      headers.UserID = userID;
    }
  } catch (e) {
    console.log(e.response);
  }

  // 将url参数写入URL
  let urlParamsStr = '';
  Object.keys(urlParams).forEach(element => {
    urlParamsStr += `${element}=${urlParams[element]}&`;
  });

  if (urlParamsStr.length !== 0) {
    urlParamsStr = `?${urlParamsStr}`.slice(0, -1);
  }

  return axios.request({
    url: `${host}${url}${urlParamsStr}`,
    method,
    headers,
    data: bodyParams,
  });
}
