import { useEffect, useState } from "react";
import Card from "../layout/Card";
import styles from "./Alunos.module.css";
import LinkButton from "../layout/LinkButton";
import Sidebar from "../layout/Sidebar";
import Button from "../layout/Button";
import api from "../../api/axios"; // use o axios configurado

import {
  Modal,
  Button as BootstrapButton,
  Form,
  Row,
  Col,
} from "react-bootstrap";

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    nomeMae: "",
    nomePai: "",
    sexo: "",
    dataNascimento: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
  });

  // Busca alunos usando axios e a URL do backend no Render
  useEffect(() => {
    api
      .get("/alunos")
      .then((resp) => {
        setAlunos(resp.data);
        console.log(resp.data);
      })
      .catch((err) => console.log("Erro ao buscar alunos:", err));
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Cria aluno usando axios e a URL do backend
  function createAluno() {
    api
      .post("/alunos", formData)
      .then((response) => {
        const novoAluno = response.data;
        setAlunos([...alunos, novoAluno]);
        setShowModal(false);
        setFormData({
          nome: "",
          telefone: "",
          nomeMae: "",
          nomePai: "",
          sexo: "",
          dataNascimento: "",
          rua: "",
          numero: "",
          bairro: "",
          cidade: "",
        });
      })
      .catch((error) => {
        const msg = error.response?.data?.message || "Erro ao criar aluno";
        alert(msg);
      });
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <section className="flex-1 p-8">
        <div className={styles.title_container}>
          <h1>Alunos</h1>
          <Button
            text="Criar Aluno"
            type="btn"
            tarefa={() => setShowModal(true)}
          />
        </div>
        <div className={styles.alunos_container}>
          {alunos.length > 0 ? (
            alunos.map((aluno) => <Card key={aluno.id} aluno={aluno} />)
          ) : (
            <p>Nenhum aluno adicionado</p>
          )}
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Criar Novo Aluno</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>{/* Aqui continua o mesmo form */}</Form>
          </Modal.Body>
          <Modal.Footer>
            <BootstrapButton
              variant="secondary"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </BootstrapButton>
            <BootstrapButton variant="primary" onClick={createAluno}>
              Criar
            </BootstrapButton>
          </Modal.Footer>
        </Modal>
      </section>
    </div>
  );
}
