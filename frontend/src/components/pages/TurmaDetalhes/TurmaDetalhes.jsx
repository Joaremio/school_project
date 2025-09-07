import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./TurmaDetalhes.module.css";
import Button from "../../layout/Button";
import Sidebar from "../../layout/Sidebar";
import Card from "../../layout/Card";
import AlunosLista from "../../layout/AlunosLista";
import api from "../../../api/axios";

export default function TurmaDetalhes() {
  const { id } = useParams();
  const [turma, setTurma] = useState(null);
  const [alunos, setAlunos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showParticipantes, setShowParticipantes] = useState(false);

  const navigate = useNavigate();

  async function fetchAlunos() {
    try {
      const resp = await api.get(`/alunos/turma/${id}`);
      setAlunos(resp.data);
    } catch (err) {
      console.error("Erro ao buscar Alunos:", err);
    }
  }

  function handleShowParticipantes() {
    setShowParticipantes(true);
    if (alunos.length === 0 && turma.quantidadeAlunos > 0) {
      fetchAlunos();
    }
  }

  useEffect(() => {
    async function fetchTurma() {
      try {
        const resp = await api.get(`/turmas/${id}`);
        setTurma(resp.data);
      } catch (err) {
        console.log("Erro ao buscar Turma:", err);
      }
    }

    fetchTurma();
  }, [id]);

  if (!turma) return <p>Carregando detalhes da turma...</p>;

  async function deleteTurma(turmaId) {
    const confirmacao = window.confirm(
      "Tem certeza que deseja excluir esta turma?"
    );
    if (!confirmacao) return;

    try {
      await api.delete(`/turmas/${turmaId}`);
      alert("Turma excluída com sucesso!");
      navigate("/turmas");
    } catch (err) {
      console.error("Erro ao deletar turma:", err);
      alert("Erro ao deletar turma. Verifique se o servidor está rodando.");
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <section className="p-8">
          <div className="grid grid-cols-[auto_1fr] items-center w-full p-4">
            <h1 className="text-xl font-bold inline-block w-1/2">
              Detalhes da turma
            </h1>

            <div className="flex gap-2 items-center justify-self-end w-1/2">
              <button
                className="bg-red-400 text-black px-4 py-2 rounded"
                onClick={() => deleteTurma(turma.id)}
              >
                Excluir
              </button>
              <button className="bg-blue-500 text-black px-4 py-2 rounded">
                Editar
              </button>
            </div>
          </div>
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

        <section className="p-8">
          <div className={styles.turmas_menu}>
            <ul>
              <li
                className={showParticipantes ? styles.active : ""}
                onClick={handleShowParticipantes}
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
                  <button onClick={() => setShowModal(true)}>Adicionar</button>
                </li>
              </ul>

              <div className="mt-6 grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
                {alunos.length > 0 ? (
                  alunos.map((aluno) => <Card key={aluno.id} aluno={aluno} />)
                ) : (
                  <p>Nenhum aluno matriculado nessa turma</p>
                )}
              </div>
            </div>
          )}
        </section>
      </div>

      <AlunosLista
        show={showModal}
        handleClose={() => setShowModal(false)}
        turmaId={id}
      />
    </div>
  );
}
