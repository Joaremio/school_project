import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./TurmaDetalhes.module.css";
import Button from "../../layout/Button";
import Sidebar from "../../layout/Sidebar";
import Card from "../../layout/Card";

export default function TurmaDetalhes() {
  const { id } = useParams();

  const [turma, setTurma] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showParticipantes, setShowParticipantes] = useState(false);
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/turma/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        if (!resp.ok) throw new Error("Erro ao buscar turma");
        return resp.json();
      })
      .then((data) => {
        console.log("Dados da turma recebidos:", data); // <--- veja aqui
        setTurma(data);

        if (data.alunos && Array.isArray(data.alunos)) {
          setAlunos(data.alunos);
        } else {
          setAlunos([]); // garante que o estado seja sempre um array
        }
      })
      .catch((err) => console.log("Erro ao buscar Turma:", err));
  }, [id]);

  if (!turma) {
    return <p>Carregando detalhes da turma...</p>;
  }

  function deleteTurma(turmaId) {
    const confirmacao = window.confirm(
      "Tem certeza que deseja excluir esta turma?"
    );
    if (!confirmacao) return;

    fetch(`http://localhost:8080/turma/${turmaId}`, {
      method: "DELETE",
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Erro ao deletar turma!");
        }
        return resp.text();
      })
      .then(() => {
        alert("Turma excluída com sucesso!");
        navigate("/turmas");
      })
      .catch((err) => {
        console.error("Erro ao deletar turma:", err);
        alert("Erro ao deletar turma. Verifique se o servidor está rodando.");
      });
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <section className="p-8">
          <h1 className={styles.title}>Detalhes da Turma</h1>
          <div className={styles.turmas_details}>
            <ul>
              <li>
                Código: <span>{turma.codigo}</span>
              </li>
              <li>
                Turno: <span>{turma.turno}</span>
              </li>
              <li>
                Vagas: <span>{turma.vagas}</span>
              </li>
            </ul>
          </div>
        </section>

        <div className="flex flex-col flex-1">
          <section className="p-8">
            <div className={styles.turmas_menu}>
              <ul>
                <li
                  className={showParticipantes ? styles.active : ""}
                  onClick={() => setShowParticipantes(true)}
                >
                  Participantes
                </li>
                <li>Frequência</li>
              </ul>
            </div>
            {showParticipantes && (
              <div className={styles.alunos_list}>
                <ul>
                  <li>Alunos</li>
                  <li>
                    <button>Adicionar</button>
                  </li>
                </ul>
                <div>
                  {alunos.length > 0 ? (
                    alunos.map((aluno) => <Card aluno={aluno} />)
                  ) : (
                    <p>Nenhum aluno adicionado</p>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
