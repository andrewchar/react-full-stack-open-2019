import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const create = contact => {
  const request = axios.post(baseUrl, contact);
  return request.then(res => res.data);
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(res => res.data);
};

const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(res => res);
};

const update = (person) => {
  const { name,newNumber, id } = person
  const number = {
    name,
    id,
    number: newNumber
  }
  const request = axios.put(`${baseUrl}/${id}/`, number);
  return request.then(res => res.data);
}

export default {
  create,
  getAll,
  remove,
  update
};
