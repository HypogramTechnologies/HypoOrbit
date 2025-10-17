import axios from 'axios';

const wtss = axios.create({
  baseURL: 'https://data.inpe.br/bdc/wtss/v4',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default wtss;