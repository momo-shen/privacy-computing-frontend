import request from 'umi-request';

request.interceptors.request.use((url, options) => {
  return {
    url: `${url}`,
    options: {
      ...options,
      mode: 'no-cors',
      interceptors: true,
      headers: {
        'Content-Type': 'application/json'
      },
    },
  };
});
