import { Link, useNavigate } from "react-router-dom";
import myImagine from "../../images/logo.jpeg";
import { useEffect, useState } from "react";

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="bg-red-500 w-full h-16 flex items-center p-4">
      <nav>
        <ul className="flex gap-6 font-bold">
          <li>Turmas</li>
          <li>Alunos</li>
        </ul>
      </nav>

      <div className="bg-red-500 w-20 h-20"></div>
    </div>
  );
}
