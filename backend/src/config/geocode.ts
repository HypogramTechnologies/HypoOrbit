import axios from 'axios';

const geocode = axios.create({
  baseURL: 'https://photon.komoot.io',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default geocode;