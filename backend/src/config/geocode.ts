import axios from 'axios';

const geocode = axios.create({
  baseURL: 'https://photon.komoot.io/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default geocode;