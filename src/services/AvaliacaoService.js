import http from "../common/http-common";

const API_URL = "avaliacao/";

const findAll = () => {
  return http.mainInstance.get(`${API_URL}findAll`);
};

const save = (data) => {
  return http.mainInstance.post(`${API_URL}save`, data);
};

const avaliacaoService = {
  findAll,
  save,
};

export default avaliacaoService;
