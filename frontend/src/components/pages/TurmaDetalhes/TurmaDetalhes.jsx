import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../Ficha.module.css";
import Button from "../../layout/Button";

export default function TurmaDetalhes() {
  const { id } = useParams();

  const [turma, setTurma] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/turma/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        setTurma(data);
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
    <div className={styles.container}>
      <div className={styles.dados}>
        <div className={styles.title}>Detalhes da turma</div>
        <ul>
          <li>
            <span>Código: </span>
            {turma.codigo}
          </li>
          <li>
            <span>Turno: </span>
            {turma.turno}
          </li>
          <li>
            <span>Vagas: </span>
            {turma.vagas}
          </li>
        </ul>
      </div>
      <div className={styles.btns}>
        <Button text="Editar" type="btn" />
        <Button
          text="Excluir"
          type="btn"
          tarefa={() => deleteTurma(turma.id)}
        />
      </div>
    </div>
  );
}
