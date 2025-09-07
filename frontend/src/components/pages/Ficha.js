import styles from "./Ficha.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../layout/Button";
import Form from "../form/Form";
import Sidebar from "../layout/Sidebar";
import api from "../../api/axios"; // use a instância do axios configurada

export default function Ficha() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aluno, setAluno] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (id) {
      api
        .get(`/alunos/${id}`)
        .then((resp) => setAluno(resp.data))
        .catch((err) => {
          console.log("Erro ao buscar aluno:", err);
          setErro(err.response?.data?.message || "Erro ao buscar aluno");
        });
    }
  }, [id]);

  if (erro) return <p style={{ color: "red" }}>{erro}</p>;
  if (!aluno) return <p>Carregando...</p>;

  function editando() {
    setIsEditing(true);
  }

  function edit(updatedAluno) {
    api
      .put(`/alunos/${updatedAluno.id}`, updatedAluno)
      .then((resp) => {
        setAluno(resp.data);
        setIsEditing(false);
      })
      .catch((err) => {
        console.log("Erro ao atualizar aluno:", err);
        alert(err.response?.data?.message || "Erro ao atualizar aluno");
      });
  }

  function excluir() {
    if (!window.confirm("Tem certeza que deseja excluir este aluno?")) return;

    api
      .delete(`/alunos/${aluno.id}`)
      .then(() => {
        alert("Aluno excluído com sucesso!");
        navigate("/alunos");
      })
      .catch((err) => {
        console.log("Erro ao deletar aluno:", err);
        alert(err.response?.data?.message || "Erro ao deletar aluno");
      });
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
