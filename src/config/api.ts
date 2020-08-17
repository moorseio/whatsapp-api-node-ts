import axios from 'axios';

export const auth = axios.create({
  baseURL: `${process.env.MOORSE_URL}/oauth`,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
});

export const apiMessage = axios.create({
  baseURL: `${process.env.MOORSE_URL}/api/v2/whatsApp`,
});
