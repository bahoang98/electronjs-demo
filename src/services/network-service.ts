// import Config from 'react-native-config';
// import {getUniqueId} from 'react-native-device-info';
// import * as Sentry from '@sentry/react-native';
import Axios, {AxiosStatic, Canceler} from 'axios';
// import i18next from 'i18next';
import {forEach, isNull, merge} from 'lodash';
import qs from 'qs';
import {stringify} from 'query-string';
import {API_PATHS} from '../constants';
import {deepTrim} from '../utils';
import {Platform} from 'react-native';
// import { AppAccessToken } from '../mobx/models/access-token';
// // import { ModalService } from './modal-service';
// import { ToastService } from './toast-service';

// const REFRESH_STATUS_CODES = [401];
// const NETWORK_ERROR_MESSAGE = 'Network Error';
const API_URL = 'http://127.0.0.1:3000/';
// Axios.interceptors.response.use(
//   async response => {
//     if (response?.data?.data?.refreshToken) {
//       const { config, data } = response;
//       // const { auth } = require('@/app-store/app-store').default;
//       if (data?.data?.refreshToken) {
//         config.headers.Authorization = `Bearer ${data?.data?.refreshToken}`;
//         // auth.refreshToken(data?.data?.refreshToken);
//         try {
//           return await Axios(config);
//         } catch (error) {
//           throw error;
//         }
//       }
//     }
//     return response;
//   },
//   async error => {
//     const { response } = error;
//     // const { auth, clearStore } = require('@/app-store/app-store').default;
//     if (error.message === NETWORK_ERROR_MESSAGE) {
//       ModalService.showNotifyModal(i18next.t('common.no_internet'));
//     }
//     if (response?.status && REFRESH_STATUS_CODES.includes(response.status)) {
//       console.log('END');
//       AppAccessToken.removeAccessToken();
//     }
//     // Return any error which is not due to authentication back to the calling service
//     return Promise.reject(error);
//   },
// );

type Request = {
  abort: () => void;
  promise: Promise<any>;
};

// const deviceCode = getUniqueId();

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type Options = {
  method?: Method;
  headers?: {[key: string]: string} | null;
  data?: {[key: string]: any};
  timeout?: number;
  isAuth?: boolean;
  qs?: any;
  url?: string;
  suffix?: string;
  token?: string;
};

function ajaxOptions(url: string, options: Options = {}) {
  const baseOptions: Record<string, any> = {
    ...options,
    url,
    // timeout: 16000,
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json; charset=utf-8',
      // 'device-code': deviceCode,
      'cache-control': 'no-cache',
      devicetype: Platform.OS,
    },
  };

  if (options.headers) {
    baseOptions.headers = {...options.headers};
  }
  if (options.timeout) {
    baseOptions.timeout = options.timeout;
  }

  if (
    options?.method === 'GET' &&
    options.data &&
    Object.keys(options.data).length
  ) {
    url = `${url}?${qs.stringify(options.data, options.qs)}`;
    return Object.assign({}, baseOptions, {url});
  }

  const formData = new FormData();
  let hasFile = false;

  forEach(options.data, (val: any, attr: string) => {
    // eslint-disable-next-line no-undef
    hasFile = hasFile || val instanceof Blob;

    if (!isNull(val)) {
      formData.append(attr, val);
    }
  });

  if (hasFile) {
    return Object.assign({}, baseOptions, {
      cache: false,
      processData: false,
      data: formData,
    });
  }

  return Object.assign({}, baseOptions, {data: options.data});
}

function ajax(
  url: string,
  options: Options,
  axiosInstance: AxiosStatic,
): Request {
  const {CancelToken} = axiosInstance;
  let cancel: Canceler;
  let ops = deepTrim(options);
  // if (ops?.isAuth) {
  ops = {
    ...ops,
    headers: {
      accept: '*/*',
      'content-type': 'application/json; charset=utf-8',
      // authorization: AppAccessToken.accessToken
      //   ? 'Bearer ' + AppAccessToken.accessToken
      //   : ops.token
      //   ? 'Bearer ' + ops.token
      //   : '',
      // ...ops.headers,
      'cache-control': 'no-cache',
      // appEnv: Config.APP_ENV,
      // appVersion: Platform.appVersion,
      platform: Platform.OS,
    },
  };
  //   delete ops.isAuth;
  // }

  const ajaxOps = ajaxOptions(url, ops);
  if (ops.method === 'GET') {
    delete ajaxOps.data;
  }
  const xhr = axiosInstance({
    ...ajaxOps,
    cancelToken: new CancelToken(c => {
      cancel = c;
    }),
    paramsSerializer: (params: any) => {
      return stringify(params, {arrayFormat: 'comma'});
    },
  });

  const promise = new Promise((resolve, reject) => {
    const infoLogs = {
      infoRequest: {},
      response: {},
      error: {},
    };
    infoLogs.infoRequest = ajaxOps;
    // console.log(ajaxOps);
    xhr.then(
      (response: any) => {
        console.log(
          '***RESPONSE REQUEST ',
          response.config?.method,
          ': ',
          response.config?.url,
        );
        console.log('- status: ', response.status);
        // console.log('- headers: ', response.headers);
        console.log('- data: ', JSON.stringify(response.data));

        infoLogs.response = response.data;
        return resolve(response.data);
      },
      (error: any) => {
        console.log(
          '***ERROR REQUEST ',
          error.config?.method,
          ': ',
          error.config?.url,
        );
        console.log('- mesage: ', error.message);
        console.log('- data: ', error.response?.data);

        infoLogs.error = error;
        // Sentry.captureException(error);
        return reject(
          error.response?.data || {
            type: REQUEST_ERROR_TYPE.NETWORK_ERROR,
          },
        );
      },
    );
  });

  const abort = () => {
    cancel?.();
  };

  return {abort, promise};
}

export class NetworkServiceBase {
  apiPath = '';
  apiVersion = '';
  commonOptions = {};

  constructor(apiPath = API_URL, apiVersion = 'v1', commonOptions = {}) {
    this.apiPath = apiPath;
    this.apiVersion = apiVersion;
    this.commonOptions = commonOptions;
  }

  createRequestURL(path: keyof typeof API_PATHS, options: Options) {
    let apiPath: string = API_PATHS[path];
    apiPath = apiPath.replace('{version}', this.apiVersion);
    if (options?.suffix) {
      apiPath += options?.suffix;
    }
    return `${this.apiPath}${apiPath}`;
  }

  get(
    path: keyof typeof API_PATHS,
    data: any = {},
    options: Options = {},
  ): Request {
    const url = this.createRequestURL(path, options);
    console.log('***REQUEST GET URL ', url);
    return ajax(
      url,
      merge({}, {method: 'GET', data}, this.commonOptions, options),
      Axios,
    );
  }

  post(
    path: keyof typeof API_PATHS,
    data: any,
    options: Options = {},
  ): Request {
    const url = this.createRequestURL(path, options);
    console.log('***REQUEST POST URL ', url, '| data: ', data);
    return ajax(
      url,
      merge({}, {method: 'POST', data}, this.commonOptions, options),
      Axios,
    );
  }

  put(path: keyof typeof API_PATHS, data: any, options: Options = {}): Request {
    const url = this.createRequestURL(path, options);
    console.log('***REQUEST PUT URL ', url, '| data: ', data);
    return ajax(
      url,
      merge({}, {method: 'PUT', data}, this.commonOptions, options),
      Axios,
    );
  }

  patch(
    path: keyof typeof API_PATHS,
    data: any,
    options: Options = {},
  ): Request {
    const url = this.createRequestURL(path, options);
    console.log('***REQUEST PATCH URL ', url, '| data: ', data);
    return ajax(
      url,
      merge({}, {method: 'PATCH', data}, this.commonOptions, options),
      Axios,
    );
  }

  del(path: keyof typeof API_PATHS, data: any, options: Options = {}): Request {
    const url = this.createRequestURL(path, options);
    console.log('***REQUEST DEL URL ', url, '| data: ', data);
    return ajax(
      url,
      merge({}, {method: 'DELETE', data}, this.commonOptions, options),
      Axios,
    );
  }
}

export const NetworkService = new NetworkServiceBase();

export enum REQUEST_ERROR_TYPE {
  NETWORK_ERROR = 'NETWORK_ERROR',
}

// export function handleRequestError(error: {[k: string]: any}) {
//   if (error && error.type === REQUEST_ERROR_TYPE.NETWORK_ERROR) {
//     ToastService.showError('notify.network_error');
//   } else {
//     ToastService.showError(error?.message);
//   }
// }
