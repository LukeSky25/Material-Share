export const isUserLoggedIn = () => {
  const userDataString = localStorage.getItem("user");

  if (!userDataString) {
    return { loggedIn: false, data: null };
  }

  try {
    const userData = JSON.parse(userDataString);

    if (userData && userData.id && userData.email) {
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
