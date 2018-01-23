import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  const r = axios.get(baseUrl);
  return r.then(response => response.data);
};

const create = newObject => {
  const r = axios.post(baseUrl, newObject);
  return r.then(response => response.data);
};

const remove = id => {
  const r = axios.delete(`${baseUrl}/${id}`);
  return r.then(response => response.data);
};

const update = (id, changedPerson) => {
  return axios
    .put(`${baseUrl}/${id}`, changedPerson)
    .then(response => response.data);
};

export default { getAll, create, remove, update };
