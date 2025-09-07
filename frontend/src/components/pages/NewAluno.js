import Form from "../form/Form";
import { useState } from "react";
import styles from "./NewAluno.module.css";
import Message from "../layout/Message";
import api from "../../api/axios"; // instância configurada com baseURL

export default function NewAluno() {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  function addAluno(formData, resetForm) {
    console.log("Enviando:", formData);

    api
      .post("/aluno", formData)
      .then((resp) => {
        setMessage("Aluno matriculado com sucesso!");
        setType("success");
        resetForm();
      })
      .catch((err) => {
        const errorMsg =
          err.response?.data?.message || "Erro ao matricular aluno";
        setMessage(errorMsg);
        setType("error");
      });
  }

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>Dados do aluno</h3>
      {message && <Message type={type} msg={message} />}
      <Form btn="Adicionar" handleSubmit={addAluno} />
    </section>
  );
}
