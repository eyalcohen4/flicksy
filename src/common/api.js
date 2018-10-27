import requiredParam from './requiredParam';
import buildElement from './buildElement';

class Api {
  constructor() {
    this.BASE_URL = 'https://api.flickr.com';
  }

  buildFullUrl(url, params, callbackName) {
    const calculatedParams = new URLSearchParams({ ...params, jsoncallback: callbackName });
    return `${this.BASE_URL}/${url}?${calculatedParams.toString()}`;
  }

  async sendRequest({
    method = requiredParam('method'),
    url = requiredParam('url'),
    data,
    headers

  }) {
    const fullUrl = `${this.BASE_URL}/${url}`;

    return fetch(fullUrl, {
      method,
      headers,
      body: JSON.stringify(data)
    });
  }

  /* JSONP request
   * inspired by this stackoverflow answer: https://stackoverflow.com/a/28262648/5716723
  */
  sendJsonpRequest({
    url,
    params,
    callback,
    callbackName
  }) {
    const fullUrl = this.buildFullUrl(url, params, callbackName);
    const script = buildElement('script', {
      src: fullUrl,
      type: 'text/javascript'
    });

    this.setJsonpCallback(callback, callbackName, script);
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  setJsonpCallback(callback, callbackName, script) {
    window[callbackName] = data => {
      callback.call(window, data);
      document.getElementsByTagName('head')[0].removeChild(script);
      delete window[callbackName];
    };
  }

  getFeed() {
    return new Promise((resolve, reject) => {
      this.sendJsonpRequest({
        url: '/services/feeds/photos_public.gne',
        params: {
          format: 'json',
        },
        callbackName: 'getFeed',
        callback: (data) => {
          if (data) {
            resolve(data);
          }

          reject(data);
        },
      });
    });
  }

  getAuthorPhotos(authorId) {
    return new Promise((resolve, reject) => {
      this.sendJsonpRequest({
        url: '/services/feeds/photos_public.gne',
        params: {
          format: 'json',
          id: authorId
        },
        callbackName: 'getAuthorPhotos',
        callback: (data) => {
          if (data) {
            resolve(data);
          }

          reject(data);
        },
      });
    });
  }
}

export default new Api();

