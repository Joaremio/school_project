import React, { useState } from "react";
import api from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { IoReturnUpBackOutline } from "react-icons/io5";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const resp = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", resp.data.token);
      navigate("/");
    } catch (err) {
      console.error("Erro ao registrar:", err); // ✅ Melhor para debug
      alert("Erro ao registrar!");
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-[#F6F6F6] p-4">
      <form
        onSubmit={handleRegister}
        // Adicionado mais padding e margem para afastar das bordas
        className="bg-white w-full max-w-4xl rounded-3xl p-12 flex justify-center items-center min-h-[550px] mx-4"
      >
        {/* Container interno com padding adicional */}
        <div className="w-full max-w-3xl flex flex-col gap-6">
          <Link to="/login">
            <button className="text-lef text-black">
              <IoReturnUpBackOutline />
            </button>
          </Link>
          <h2 className="text-2xl font-bold mb-2">Registrar</h2>

          {/* Linha 1: Nome e Email */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="text-sm mb-2 block font-medium">Nome:</label>
              <input
                type="text"
                placeholder="Digite seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-[#DDDDDD] rounded-lg p-2 border w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm mb-2 block font-medium">Email:</label>
              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#DDDDDD] rounded-lg p-2 border w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Linha 2: Senha e Confirmação */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="text-sm mb-2 block font-medium">Senha:</label>
              <input
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#DDDDDD] rounded-lg p-2 border w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm mb-2 block font-medium">
                Confirmar Senha:
              </label>
              <input
                type="password"
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-[#DDDDDD] rounded-lg p-2 border w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#C8102E] text-white rounded-full py-2 px-1 hover:bg-red-800 w-20 mx-auto "
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}
