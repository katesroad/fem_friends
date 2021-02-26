import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

axios.defaults.baseURL = apiURL;

export default async function fetch(endpoint) {
  return axios
    .get(`${apiURL}/${endpoint}`)
    .then((res) => res.data)
    .catch((e) => null);
}
