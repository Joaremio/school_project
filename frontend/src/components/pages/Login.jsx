import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import logo from "../../images/logo.jpeg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Mensagem de erro
  const [loading, setLoading] = useState(false); // Loading do botão
  const navigate = useNavigate();
  const { login } = useAuth(); // hook do AuthContext

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const resp = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });

      // Atualiza estado global + localStorage
      login(resp.data.token, email);

      navigate("/"); // Redireciona para a home
    } catch (err) {
      // Se o backend retorna mensagem de erro
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Login inválido. Verifique suas credenciais.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Lado esquerdo - logo */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <img src={logo} alt="Logo" className="w-2/3" />
      </div>

      {/* Lado direito - login */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-[#F6F6F6] p-8">
        <h1 className="text-2xl font-bold py-8">Sistema de Educação</h1>
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 w-full max-w-[500px] bg-white px-10 py-12 h-[500px] shadow-lg justify-center rounded-3xl mt-3"
        >
          <div className="flex flex-col w-3/4 mx-auto rounded-b-md">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-3xl p-2 mt-2 bg-[#DDDDDD]"
              required
            />
          </div>

          <div className="flex flex-col w-3/4 mx-auto">
            <label htmlFor="password">Senha:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-3xl p-2 mt-2 bg-[#DDDDDD]"
              required
            />
            <p className="text-[11px] mt-3 underline hover:text-gray-600 cursor-pointer">
              Esqueci minha senha
            </p>
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center mt-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`bg-[#C8102E] text-white rounded-3xl py-2 px-1 hover:bg-red-800 w-40 mx-auto ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <div className="w-3/4 mx-auto text-center mt-4">
            <Link
              to="/register"
              className="text-xs underline hover:text-gray-600 cursor-pointer text-black"
            >
              Primeiro acesso? Registrar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
