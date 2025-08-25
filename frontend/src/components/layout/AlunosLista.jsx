import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { IoMdAdd } from "react-icons/io";

export default function AlunoModal({ show, handleClose, turmaId }) {
  const [alunos, setAlunos] = useState([]);

  // Buscar alunos sem turma quando o modal abrir
  useEffect(() => {
    if (show) {
      const token = localStorage.getItem("token");

      fetch("http://localhost:8080/aluno/sem-turma", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          if (!resp.ok) throw new Error("Erro ao buscar alunos sem turma");
          return resp.json();
        })
        .then((data) => setAlunos(data))
        .catch((err) => console.error(err));
    }
  }, [show]);

  function addAlunoOnTurma(alunoId) {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/turma/adicionar/${alunoId}/${turmaId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        if (!resp.ok) throw new Error("Erro ao adicionar aluno na turma");
        setAlunos((prev) => prev.filter((a) => a.id !== alunoId));
      })
      .catch((err) => console.error(err));
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
