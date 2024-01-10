import axios from 'axios';
import constants from './constants';

export const api = axios.create({
  baseURL: constants.baseURL,
});
