import http from "../common/http-common";

const API_URL = "usuario/";

const findAll = () => {
  return http.mainInstace.get(`${API_URL}findAll`);
};

const findById = (id) => {
  return http.mainInstace.get(`${API_URL}findById/${id}`);
};

const signIn = async (email, senha) => {
  const response = await http.mainInstace.post(API_URL + "login", {
    email,
    senha,
  });
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const save = (data) => {
  return http.mainInstace.post(`${API_URL}save`, data);
};

const alterarSenha = (id, data) => {
  return http.mainInstace.put(`${API_URL}alterarSenha/${id}`, data);
};

const usuarioService = {
  findAll,
  findById,
  signIn,
  logout,
  save,
  alterarSenha,
};

export default usuarioService;
