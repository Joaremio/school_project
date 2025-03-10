import { useEffect, useState } from "react";
import Card from "../layout/Card";
import styles from "./Alunos.module.css";
import LinkButton from "../layout/LinkButton";

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/sistema/alunos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data); // Verifique no console se os dados estão corretos
        setAlunos(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section>
      <div className={styles.title_container}>
        <h1>Alunos</h1>
        <LinkButton to="/NewAluno" text="Adicionar" />
      </div>
      <div className={styles.alunos_container}>
        {alunos.length > 0 ? (
          alunos.map((aluno) => (
            <Card
              aluno={aluno}
            />
          ))
        ) : (
          <p>Nenhum aluno adicionado</p>
        )}
      </div>
    </section>
  );
}
