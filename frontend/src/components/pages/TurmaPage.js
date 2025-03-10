
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Card from '../layout/Card'
import styles from "./Alunos.module.css";



export default function TurmaPage(){

    const { id } = useParams();

    const [turma,setTurma] = useState([])
    const [alunos,setAlunos] = useState([])



    useEffect(() => {
        if (id) {  // Garante que o ID não é undefined antes de fazer a requisição
            fetch(`http://localhost:8080/turmas/${id}`)
                .then((resp) => resp.json())
                .then((data) => {
                    setTurma(data);
                    setAlunos(data.alunos);
                })
                .catch((err) => console.log("Erro ao buscar Turma:", err));
        }
    }, [id]);


    return (
        <section>
              <div className={styles.title_container}>
                <h1>Alunos</h1>
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
    )
}