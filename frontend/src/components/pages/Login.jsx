import React, { useState } from "react";
import axios from "axios";
import logo from "../../images/logo.jpeg";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", resp.data.token);
      navigate("/");
    } catch (err) {
      alert("Login inválido!");
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
          className="flex flex-col gap-4 w-full max-w-[500px] bg-white px-10 py-12 h-[500px]  shadow-lg justify-center rounded-3xl mt-3 "
        >
          <div className="flex flex-col w-3/4 mx-auto rounded-b-md">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-3xl p-2 mt-2 bg-[#DDDDDD]"
            />
          </div>

          <div className="flex flex-col w-3/4 mx-auto">
            <label>Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-3xl p-2 mt-2 bg-[#DDDDDD]"
            />
            <p className="text-[11px] mt-3 underline hover:text-gray-600 cursor-pointer">
              Esqueci minha senha
            </p>
          </div>
          <button
            type="submit"
            className="bg-[#C8102E] text-white rounded-3xl py-2 px-1 hover:bg-red-800 w-40 mx-auto "
          >
            Entrar
          </button>
          <div className="w-3/4 mx-auto">
            <Link
              to="/register"
              className="text-xs underline mt-4 hover:text-gray-600 cursor-pointer text-black"
            >
              Primeiro acesso? Registrar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
