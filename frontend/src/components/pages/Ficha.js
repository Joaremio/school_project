import styles from "./Ficha.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../layout/Button";
import Form from "../form/Form";
import Sidebar from "../layout/Sidebar";

export default function Ficha() {
  const { id } = useParams(); // Pega o ID da URL
  const navigate = useNavigate();
  const [aluno, setAluno] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (id) {
      const token = localStorage.getItem("token");
      fetch(`http://localhost:8080/alunos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          if (!resp.ok) {
            throw new Error(
              `Erro ${resp.status}: Não foi possível buscar o aluno`
            );
          }
          return resp.json();
        })
        .then((data) => setAluno(data))
        .catch((err) => {
          console.log("Erro ao buscar aluno:", err);
          setErro(err.message);
        });
    }
  }, [id]);

  if (erro) {
    return <p style={{ color: "red" }}>{erro}</p>;
  }

  if (!aluno) {
    return <p>Carregando...</p>;
  }

  function editando() {
    setIsEditing(true);
  }

  function edit(updatedAluno) {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/alunos/${updatedAluno.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedAluno),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Erro ao atualizar o aluno!");
        }
        return resp.json();
      })
      .then((data) => {
        console.log("Aluno atualizado com sucesso:", data);
        setIsEditing(false);
        setAluno(data);
      })
      .catch((err) => console.log(err));
  }

  function excluir() {
    const confirmacao = window.confirm(
      "Tem certeza que deseja excluir este aluno?"
    );
    if (!confirmacao) return;

    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/alunos/${aluno.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Erro ao deletar o aluno!");
        }
        return resp.text();
      })
      .then(() => {
        alert("Aluno excluído com sucesso!");
        navigate("/alunos");
      })
      .catch((err) => console.log(err));
  }

  function formatarData(data) {
    if (!data) return "";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        {isEditing ? (
          <Form handleSubmit={edit} btn="Salvar" alunoEdit={aluno} />
        ) : (
          <>
            <div className={styles.container}>
              <div className={styles.dados}>
                <div className={styles.title}>
                  <h3>Dados</h3>
                </div>
                <ul>
                  <li>
                    <span>Aluno: </span>
                    {aluno.nome}
                  </li>
                  <li>
                    <span>Matrícula: </span>
                    {aluno.matricula}
                  </li>
                  <li>
                    <span>Nascimento: </span>
                    {formatarData(aluno.dataNascimento)}
                  </li>
                  <li>
                    <span>Mãe: </span>
                    {aluno.nomeMae}
                  </li>
                  <li>
                    <span>Pai: </span>
                    {aluno.nomePai}
                  </li>
                  <li>
                    <span>Sexo: </span>
                    {aluno.sexo}
                  </li>
                  <li>
                    <span>Contato: </span>
                    {aluno.telefone}
                  </li>
                  <li>
                    <span>Data de matrícula: </span>
                    {formatarData(aluno.dataMatricula)}
                  </li>
                </ul>
              </div>
              <div className={styles.dados}>
                <div className={styles.title}>
                  <h3>Endereço</h3>
                </div>
                <ul>
                  <li>
                    <span>Rua: </span>
                    {aluno?.endereco?.rua || "Não informado"}
                  </li>
                  <li>
                    <span>Número: </span>
                    {aluno?.endereco?.numero || "Não informado"}
                  </li>
                  <li>
                    <span>Bairro: </span>
                    {aluno?.endereco?.bairro || "Não informado"}
                  </li>
                  <li>
                    <span>Cidade: </span>
                    {aluno?.endereco?.cidade || "Não informado"}
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.btns}>
              <Button text="Editar" type="btn" tarefa={editando} />
              <Button text="Excluir" type="btn" tarefa={excluir} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
