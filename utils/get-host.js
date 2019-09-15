function getHost(req, debug = false) {
  console.log(process.cwd());
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
  const host = process.browser ? window.location : process.cwd();
  if (host.startsWith('https://nextjs.hhoomph.now.sh')) {
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