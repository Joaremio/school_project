import styles from "./Card.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LinkButton from "./LinkButton";
import { useNavigate, useParams } from "react-router-dom"; // Verifique se 'useNavigate' está importado
import { FiPhone, FiUser, FiTrash2, FiArrowRight } from "react-icons/fi";

export default function Card({ aluno, onRemove }) {
  const navigate = useNavigate();
  // Lógica para pegar as duas primeiras iniciais do nome do aluno
  const getInitials = (name) => {
    if (!name) return "?";
    const words = name.split(" ");
    if (words.length > 1) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    return `${words[0][0]}`.toUpperCase();
  };

  function handleViewAlunoDetails(alunoId) {
    navigate(`/ficha/${alunoId}`);
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-slate-200">
      <div className="flex items-start gap-4">
        {/* Avatar com Iniciais */}
        <div className="flex-shrink-0 w-14 h-14 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xl font-bold text-white">
            {getInitials(aluno.nome)}
          </span>
        </div>

        {/* Bloco de Informações Principais */}
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-slate-800">{aluno.nome}</h3>
          <p className="text-sm text-slate-500">Matrícula: {aluno.matricula}</p>

          {/* Informações de Contato com Ícones */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <FiPhone className="text-slate-400" />
              <span>{aluno.telefone || "Telefone não informado"}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiUser className="text-slate-400" />
              <span>Mãe: {aluno.nomeMae || "Não informado"}</span>
            </div>
          </div>
        </div>

        {/* Bloco de Ações */}
        <div className="flex flex-col items-center gap-2">
          <button
            className="text-slate-400 hover:text-red-500 transition-colors"
            title="Remover Aluno"
            onClick={() => onRemove(aluno.id)}
          >
            <FiTrash2 size={20} />
          </button>
          <button
            className="text-slate-400 hover:text-blue-500 transition-colors"
            title="Ver Perfil Completo"
            onClick={() => handleViewAlunoDetails(aluno.id)}
          >
            <FiArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
