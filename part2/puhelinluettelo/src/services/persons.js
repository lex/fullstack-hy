import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const r = axios.get(baseUrl);
  return r.then(response => response.data);
};

const create = newObject => {
  const r = axios.post(baseUrl, newObject);
  return r.then(response => response.data);
};

export default { getAll, create };
