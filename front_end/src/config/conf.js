import env from './env';

let conf = {};

if (env === 'development') {
  conf = {
    server_host: `${window.location.protocol}//${window.location.host}`,
    // server_host: 'http://127.0.0.1:3000',
  };
} else {
  conf = {
    server_host: `${window.location.protocol}//${window.location.host}`,
  };
}

export default conf;
