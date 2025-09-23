import axios from 'axios';

const stac = axios.create({
  baseURL: 'https://data.inpe.br/bdc/stac/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default stac;