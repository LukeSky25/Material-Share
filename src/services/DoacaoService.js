import http from "../common/http-common";

const API_URL = "doacao/";

const findAll = () => {
  return http.mainInstance.get(`${API_URL}findAll`);
};

const findById = (id) => {
  return http.mainInstance.get(`${API_URL}findById/${id}`);
};

const findByDoador = (pessoaId) => {
  return http.mainInstance.get(`${API_URL}findByDoador/${pessoaId}`);
};

const findSolicitadasByBeneficiario = (pessoaId) => {
  return http.mainInstance.get(
    `${API_URL}findSolicitadasByBeneficiario/${pessoaId}`
  );
};

const solicitar = (doacaoId, beneficiarioId) => {
  return http.mainInstance.put(
    `${API_URL}solicitar/${doacaoId}/beneficiario/${beneficiarioId}`
  );
};

const create = (data) => {
  const formData = new FormData();

  formData.append("nome", data.nome);
  formData.append("descricao", data.descricao);
  formData.append("quantidade", data.quantidade);
  formData.append("cep", data.cep);
  formData.append("numeroResidencia", data.numeroResidencia);
  formData.append("complemento", data.complemento || "");
  formData.append("categoria_id", data.categoriaId);
  formData.append("pessoa_id", data.pessoaId);

  return http.mainInstance.post(`${API_URL}create`, formData);
};

const createComFoto = (data) => {
  const formData = new FormData();

  formData.append("nome", data.nome);
  formData.append("descricao", data.descricao);
  formData.append("quantidade", data.quantidade);
  formData.append("cep", data.cep);
  formData.append("numeroResidencia", data.numeroResidencia);
  formData.append("complemento", data.complemento || "");
  formData.append("categoria.id", data.categoriaId);
  formData.append("pessoa.id", data.pessoaId);

  if (data.foto) {
    formData.append("file", data.foto);
  }

  return http.multipartInstance.post(`${API_URL}createComFoto`, formData);
};

const editar = (id, data) => {
  const formData = new FormData();

  formData.append("nome", data.nome);
  formData.append("descricao", data.descricao);
  formData.append("quantidade", data.quantidade);
  formData.append("cep", data.cep);
  formData.append("numeroResidencia", data.numeroResidencia);
  formData.append("complemento", data.complemento || "");
  formData.append("statusDoacao", data.statusDoacao);
  formData.append("categoria.id", data.categoriaId);

  if (data.foto) {
    formData.append("file", data.foto);
  }

  return http.multipartInstance.put(`/doacao/editar/${id}`, formData);
};

const filtrar = (nome, categorias) => {
  const params = new URLSearchParams();
  if (nome) {
    params.append("nome", nome);
  }
  if (categorias && categorias.length > 0) {
    categorias.forEach((catId) => params.append("categorias", catId));
  }
  return http.mainInstance.get(`${API_URL}filtrar?${params.toString()}`);
};

const inativar = (id, novoStatus) => {
  return http.multipartInstance.put(`${API_URL}inativar/${id}/${novoStatus}`);
};

const doacaoService = {
  findAll,
  findById,
  findByDoador,
  findSolicitadasByBeneficiario,
  create,
  createComFoto,
  editar,
  filtrar,
  solicitar,
  inativar,
};

export default doacaoService;
