import http from "../common/http-common";

const API_URL = "categoria/";

const findAll = () => {
  return http.mainInstance.get(`${API_URL}findAll`);
};

const findById = (id) => {
  return http.mainInstance.get(`${API_URL}findById/${id}`);
};

const save = (data) => {
  return http.mainInstance.post(`${API_URL}save`, data);
};

const update = (id, data) => {
  return http.mainInstance.put(`${API_URL}update/${id}`, data);
};

const inativar = (id) => {
  return http.mainInstance.put(`${API_URL}inativar/${id}`);
};

const categoriaService = {
  findAll,
  findById,
  save,
  update,
  inativar,
};

export default categoriaService;
