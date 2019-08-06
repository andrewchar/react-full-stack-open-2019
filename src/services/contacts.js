import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const create = contact => {
  return axios.post(baseUrl, contact).then(res => res.data);
};

const getAll = () => {
  return axios.get(baseUrl).then(res => res.data);
};

const remove = id => {
  // const request = axios.delete(`${baseUrl}/${id}`);
  // return request.then(res => res);
  return axios
    .delete(`${baseUrl}/${id}`)
    .then(res => res.data)
    .catch(error => {
      console.log('failed to remove contact');
      throw error;
    });
};

const update = person => {
  const { name, newNumber, id } = person;
  const number = {
    name,
    id,
    number: newNumber
  };
  return axios.put(`${baseUrl}/${id}/`, number).then(res => res.data);
};

export default {
  create,
  getAll,
  remove,
  update
};
