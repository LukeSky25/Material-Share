import http from "../common/http-common";

const API_URL = "pessoa/";

const findAll = () => {
  return http.mainInstace.get(`${API_URL}findAll`);
};

const findById = (id) => {
  return http.mainInstace.get(`${API_URL}findById/${id}`);
};

const findByTipo = (tipo) => {
  return http.mul.get(`${API_URL}findByTipo/${tipo}`);
};

const save = (data) => {
  return http.mainInstace.post(`${API_URL}save`, data);
};

const editar = (id, data) => {
  return http.mainInstace.put(API_URL + `editar/${id}`, data);
};

const usuarioService = {
  findAll,
  findById,
  findByTipo,
  save,
  editar,
};

export default usuarioService;
