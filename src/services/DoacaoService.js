import http from "../common/http-common";

const API_URL = "doacao/";

const findAll = () => {
  return http.mainInstace.get(`${API_URL}findAll`);
};

const findById = (id) => {
  return http.mainInstace.get(`${API_URL}findById/${id}`);
};

const doacaoService = {
  findAll,
  findById,
};

export default doacaoService;
