/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import aspida from '@aspida/fetch';

import api from '../api/$api';
// import toStringId from './toStringId';

const fetchConfig: Required<Parameters<typeof aspida>>[1] = {
  baseURL: process.env.MICRO_CMS_HOST,
  throwHttpErrors: true,
  headers: {
    'X-API-KEY': process.env.MICRO_CMS_API_KEY ?? '',
  },
};

const client = api(aspida(fetch, fetchConfig));

export default client;
