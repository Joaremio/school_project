import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./TurmaDetalhes.module.css";
import Button from "../../layout/Button";
import Sidebar from "../../layout/Sidebar";
import Card from "../../layout/Card";
import AlunosLista from "../../layout/AlunosLista"; // import do modal

export default function TurmaDetalhes() {
  const { id } = useParams();
  const [turma, setTurma] = useState(null);
  const [alunos, setAlunos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showParticipantes, setShowParticipantes] = useState(false);

  const navigate = useNavigate();

  async function fetchAlunos() {
    const token = localStorage.getItem("token");
    try {
      const resp = await fetch(`http://localhost:8080/alunos/turma/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!resp.ok) {
        throw new Error("Erro ao buscar alunos da turma");
      }
      const data = await resp.json();
      setAlunos(data);
    } catch (err) {
      console.error("Erro ao buscar Alunos:", err);
    }
  }

  // NOVO: Função para controlar o clique na aba "Participantes"
  function handleShowParticipantes() {
    setShowParticipantes(true);
    // Otimização: só busca os alunos se a lista estiver vazia
    if (alunos.length === 0 && turma.quantidadeAlunos > 0) {
      fetchAlunos();
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/turmas/${id}`, {
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
        setTurma(data);
        // REMOVIDO: A busca de alunos agora é feita sob demanda
        // setAlunos(data.alunos || []);
      })
      .catch((err) => console.log("Erro ao buscar Turma:", err));
  }, [id]);

  if (!turma) return <p>Carregando detalhes da turma...</p>;

  function deleteTurma(turmaId) {
    const confirmacao = window.confirm(
      "Tem certeza que deseja excluir esta turma?"
    );
    if (!confirmacao) return;

    fetch(`http://localhost:8080/turmas/${turmaId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((resp) => {
        if (!resp.ok) throw new Error("Erro ao deletar turma!");
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
          <div className="grid grid-cols-[auto_1fr] items-center w-full p-4">
            <h1 className="text-xl font-bold inline-block w-1/2">
              Detalhes da turma
            </h1>

            {/* Os botões estão na segunda coluna da grade. 'justify-self-end' os alinha à direita */}
            <div className="flex gap-2 items-center justify-self-end w-1/2">
              <button className="bg-red-400 text-black px-4 py-2 rounded">
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
