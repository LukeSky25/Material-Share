import http from "../common/http-common";

const API_URL = "doacao/";

const findAll = () => {
  return http.mainInstance.get(`${API_URL}findAll`);
};

const findById = (id) => {
  return http.mainInstance.get(`${API_URL}findById/${id}`);
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

  // Dados da Doação
  formData.append("nome", data.nome);
  formData.append("descricao", data.descricao);
  formData.append("quantidade", data.quantidade);
  formData.append("cep", data.cep);
  formData.append("numeroResidencia", data.numeroResidencia);
  formData.append("complemento", data.complemento || "");

  // --- CORREÇÃO DEFINITIVA AQUI ---
  // Enviando os IDs no formato que o @ModelAttribute espera para montar os objetos
  formData.append("categoria.id", data.categoriaId);
  formData.append("pessoa.id", data.pessoaId);

  // Adiciona o arquivo da foto, se existir
  if (data.foto) {
    formData.append("file", data.foto);
  }

  // Debug para verificar os dados antes do envio
  console.log("--- Dados a serem enviados para a API ---");
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  return http.multipartInstance.post(`${API_URL}createComFoto`, formData);
};

const inativar = (id, novoStatus) => {
  return http.multipartInstance.put(`${API_URL}inativar/${id}/${novoStatus}`);
};

const doacaoService = {
  findAll,
  findById,
  inativar,
  create,
  createComFoto,
};

export default doacaoService;
