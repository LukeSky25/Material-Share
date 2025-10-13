export const isUserLoggedIn = () => {
  const userDataString = localStorage.getItem("user");

  if (!userDataString) {
    return { loggedIn: false, data: null };
  }

  try {
    const userData = JSON.parse(userDataString);

    if (userData && userData.id && userData.usuario && userData.usuario.email) {
      return {
        loggedIn: true,
        data: userData,
      };
    }

    return { loggedIn: false, data: null };
  } catch (error) {
    console.error("Erro ao analisar dados do usuário:", error);
    return { loggedIn: false, data: null };
  }
};

export const isAdminLoggedIn = () => {
  const adminDataString = localStorage.getItem("adminUser");
  if (!adminDataString) {
    return false;
  }
  try {
    const adminData = JSON.parse(adminDataString);
    return !!(adminData && adminData.nivelAcesso === "ADMIN");
  } catch (error) {
    console.error("Erro ao analisar dados do admin:", error);
    return false;
  }
};
