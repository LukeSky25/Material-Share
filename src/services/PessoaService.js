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
  const formData = new FormData();

  formData.append("nome", data.nome);
  formData.append("dataNascimento", data.dataNascimento);
  formData.append("cpf_cnpj", data.cpf_cnpj);
  formData.append("numeroResidencia", data.numeroResidencia);
  formData.append("tipo", data.tipo);
  formData.append("usuario_id", data.usuario_id);
  formData.append("statusDoador", "ATIVO");

  return http.mainInstace.put(API_URL + `editar/${id}`, formData);
};

const usuarioService = {
  findAll,
  findById,
  findByTipo,
  save,
  editar,
};

export default usuarioService;
