import http from "../common/http-common";

const API_URL = "categoria/";

const findAll = () => {
  return http.mainInstance.get(`${API_URL}findAll`);
};

const categoriaService = {
  findAll,
};

export default categoriaService;
