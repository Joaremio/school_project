import axios from "axios";

const api = axios.create({
  baseURL: "https://school-project-suew.onrender.com", // seu backend
});

// Intercepta e injeta o token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response, // Se a resposta for sucesso (2xx), não faz nada
  (error) => {
    // Se o erro for 401 (Não Autorizado)
    if (error.response && error.response.status === 401) {
      // Limpa o storage e redireciona para o login
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      // Use window.location para forçar o recarregamento da página,
      // limpando qualquer estado residual do React.
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
