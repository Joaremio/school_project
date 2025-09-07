import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { IoMdAdd } from "react-icons/io";
import { api } from "../../api/axios";

export default function AlunosLista({ show, handleClose, turmaId }) {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    if (show) {
      api
        .get(`/alunos/nao-matriculados/turma/${turmaId}`)
        .then((resp) => setAlunos(resp.data))
        .catch((err) => console.error("Erro ao buscar alunos sem turma:", err));
    }
  }, [show, turmaId]);

  function addAlunoOnTurma(alunoId) {
    const body = {
      alunoId,
      turmaId,
    };

    api
      .post("/turmas/matricular", body)
      .then((resp) => {
        // remove o aluno da lista de disponíveis
        setAlunos((prev) => prev.filter((a) => a.id !== alunoId));
        console.log("Matrícula criada:", resp.data);
      })
      .catch((err) => {
        // trata erros do backend
        const msg =
          err.response?.data?.message || "Erro ao adicionar aluno na turma";
        alert(msg);
      });
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Aluno</Modal.Title>
      </Modal.Header>
      <Modal.Body className="min-h-[400px]">
        <ul className="ml-0">
          {alunos.length > 0 ? (
            alunos.map((aluno) => (
              <li
                key={aluno.id}
                className="border-1 rounded-xl p-2 flex flex-row items-center justify-between gap-4 mb-4 text-xs"
              >
                <div className="flex flex-1 gap-2">
                  <span>{aluno.nome}</span>
                  <span>({aluno.matricula})</span>
                </div>

                <button
                  onClick={() => addAlunoOnTurma(aluno.id)}
                  className="p-1 border rounded flex items-center justify-center"
                >
                  <IoMdAdd size={16} />
                </button>
              </li>
            ))
          ) : (
            <p>Nenhum aluno disponível</p>
          )}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Concluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
