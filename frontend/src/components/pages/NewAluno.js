import Form from "../form/Form";
import { useState } from "react";
import styles from "./NewAluno.module.css";
import Message from "../layout/Message";

export default function NewAluno() {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  function addAluno(formData, resetForm) {
    console.log("Enviando:", formData);

    fetch("http://localhost:8080/aluno", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(async (resp) => {
        if (!resp.ok) {
          const error = await resp.text();
          setMessage(error);
          setType("error");
          return;
        }
        setMessage("Aluno matriculado com sucesso!");
        setType("success");
        return resp.json();
      })
      .then(() => {
        console.log(formData);
        resetForm();
      })
      .catch((err) => console.log(err));
  }

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>Dados do aluno</h3>
      {message && <Message type={type} msg={message} />}
      <Form btn="Adicionar" handleSubmit={addAluno} />
    </section>
  );
}
