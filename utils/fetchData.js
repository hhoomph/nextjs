import React from 'react';
import fetch from 'isomorphic-unfetch';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import getHost from './get-host';
import Logout from '../components/Auth/Logout';
// // Use Example
// const data = await fetchData(
//   `Common/C_Location/GetAllCities`,
//   {
//     method: 'POST',
//     body: JSON.stringify({
//       provinceId: 0,
//       page: 1,
//       pageSize: 10,
//     })
//   }
// );
// if (data) {
//   console.log(data)
// }
export default async (path, opts = {}, context, isFile = false) => {
  const { accessToken, refreshToken } = nextCookie(context);
  const headers = opts.headers || {};
  if (!accessToken && !refreshToken) {
    //return false;
  } else {
    headers.Authorization = `bearer ${accessToken}`;
  }
  if (isFile) {
    // headers.Accept = 'text/plain';
    // headers['Content-Type'] = 'multipart/form-data';
  } else {
    headers.Accept = 'application/json';
    headers['Content-Type'] = 'application/json;charset=utf-8';
  }
  headers['Access-Control-Allow-Origin'] = '*';
  const url = getHost() + path;
  let res;
  let data;
  let error;
  try {
    res = await fetch(url, {
      ...opts,
      headers,
      timeout: 20000,
      credentials: 'include'
    });
    if (res.status === 403) {
      // We need to log out here
      return Logout();
    }
    if (res.status === 500) {
      return { error: `متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید.` };
    }
    if (opts.throwOnHTTPError && (res.status < 200 || res.status >= 300)) {
      if (res.headers.get('Content-Type') === 'application/json') {
        data = await res.json();
        error = new Error(data.error === null ? 'Unexpected Error' : data.error.message);
        error.res = res;
        error.status = res.status;
        error.code = data.error === null ? res.status : data.error.code;
      } else {
        throw new Error('خطایی در شبکه رخ داده است');
      }
    } else {
      data = await res.json();
      if (data.StatusCode == 6) {
        // We need to log out here
        return Logout();
      }
    }
  } catch (error2) {
    error = new Error(`خطایی در اتصال به سرور رخ داده است، لطفا بعدا امتحان کنید (${url})`);
    error.code = 'network_error';
    error.res = null;
    error.status = null;
  }
  if (error) return error;
  return data;
};