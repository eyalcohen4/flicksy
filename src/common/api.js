/* global fetch */
/* global document */

import requiredParam from './requiredParam';
import buildScriptTag from './buildScriptTag';

class Api {
  constructor() {
    this.BASE_URL = 'https://api.flickr.com';
  }

  buildFullUrl(url, params, callbackName) {
    const calculatedParams = new URLSearchParams({ ...params, jsoncallback: callbackName });
    return `${this.BASE_URL}/${url}?${calculatedParams.toString()}`;
  }


  sendJsonpRequest({
    url,
    params,
    callback,
    callbackName
  }) {
    const fullUrl = this.buildFullUrl(url, params, callbackName);
    const script = document.createElement('script', {
      src: fullUrl,
      type: 'text/javascript'
    });

    document.getElementsByTagName('head')[0].appendChild(script);
    window[callbackName] = (data) => {
      callback.call(window, data);
      document.getElementsByTagName('head')[0].removeChild(script);
      delete window[callbackName];
    };
  }

  async sendRequest({
    method = requiredParam(),
    url = requiredParam(),
    data,
    headers

  }) {
    const fullUrl = `${this.BASE_URL}/${url}`;

    await fetch(fullUrl, {
      method,
      headers,
      body: JSON.stringify(data)
    });
  }

  async getFeed() {
    try {
      this.sendJsonpRequest({
        url: '/services/feeds/photos_public.gne?format=json',
        params: {
          json: true,
        },
        callback: (data) => {
          console.log(data);
        },
        callbackName: 'getFeed'
      });
    } catch (error) {
      console.log(`[Api.getFeed] ${error}`);
    }
  }
}

export default new Api();
