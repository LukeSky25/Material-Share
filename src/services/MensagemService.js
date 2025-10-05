import http from "../common/http-common";

const API_URL = "mensagem/";

const findByDoadorId = (doadorId) => {
  return http.mainInstance.get(`${API_URL}doador/${doadorId}`);
};

const mensagemService = {
  findByDoadorId,
};

export default mensagemService;
