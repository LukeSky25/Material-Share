import http from "../common/http-common";

const API_URL = "doacao/";

const findAll = () => {
  return http.mainInstace.get(`${API_URL}findAll`);
};

const doacaoService = {
  findAll,
};

export default doacaoService;
