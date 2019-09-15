function getHost(req, debug = false) {
  // First Method
  // const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  // if (!req) {
  //   return `${protocol}://${window.location.host}/api/`;
  // } else {
  //   return `${protocol}://${req.headers.host}/api/`;
  // }
  // Second Method
  // const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  // const apiHost = process.browser ? `${protocol}://${window.location.host}/api/` : `${protocol}://${req.headers.host}/api/`;
  // check host for https://nextjs.hhoomph.now.sh domain that not support .env file to get apiUrl
  const host = process.browser ? window.location.host : process.cwd();
  if (host.startsWith('nextjs.hhoomph')) {
    return `http://qarun.ir/api/`;
  }
  if (process.env == undefined) {
    return `http://qarun.ir/api/`;
  }
  // return apiHost;
  if (debug == true) {
    return process.env.Debug_HOST;
  } else {
    return process.env.API_HOST;
  }
}
export default getHost;