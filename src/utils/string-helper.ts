import {get} from 'lodash';

export function deepTrim(obj: any) {
  if (typeof obj === 'string') {
    return obj.trim();
  } else if (typeof obj === 'object') {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        obj[key] = deepTrim(obj[key]);
      }
    }
  }
  return obj;
}

export function handleErrorMessage(error: any): {
  code: string;
  message: string;
  status: string;
} {
  const code = get(error, 'data.code');
  const message =
    get(error, 'data.errors.message') ||
    get(error, 'data.message') ||
    get(error, 'errors.message') ||
    get(error, 'message') ||
    'something wrong';
  const status = get(error, 'status');

  return {code, message, status};
}
