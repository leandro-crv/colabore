import axios from 'axios'

const api = axios.create({
  baseURL: 'https://colabore-api-dbc.herokuapp.com/swagger-ui/'
});

export default api