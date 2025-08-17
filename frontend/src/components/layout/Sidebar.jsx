import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.jpeg";
import { SiGoogleclassroom } from "react-icons/si";
import { MdGroups } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-[#C8102E] w-40 min-h-screen p-6 flex flex-col">
      {/* Logo */}
      <div style={{ paddingTop: "20px", paddingBottom: "10px" }}>
        <img src={logo} alt="Logo" className="w-24 h-auto mx-auto" />
      </div>
      {/* Links - Centralizados */}
      <div className="flex-1 flex ">
        <ul className="flex flex-col">
          <li>
            <Link
              to="/turmas"
              className="flex hover:text-yellow-300 mt-4 gap-2 text-white items-center"
              style={{ textDecoration: "none" }}
            >
              <SiGoogleclassroom /> Turmas
            </Link>
          </li>
          <li>
            <Link
              to="/alunos"
              className="flex hover:text-yellow-300 mt-4 gap-2 items-center text-white"
              style={{ textDecoration: "none" }}
            >
              <MdGroups /> Alunos
            </Link>
          </li>
        </ul>
      </div>

      <div className="mb-5 flex items-center justify-center ">
        <button
          onClick={handleLogout}
          className="flex gap-2 py-2 px-4 bg-white items-center font-bold rounded hover:bg-gray-100"
          style={{ color: "#C8102E" }}
        >
          <FiLogOut /> Sair
        </button>
      </div>
    </nav>
  );
}
