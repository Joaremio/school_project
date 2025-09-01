import { useEffect, useState } from "react";
import Card from "../layout/Card";
import styles from "./Alunos.module.css";
import LinkButton from "../layout/LinkButton";
import Sidebar from "../layout/Sidebar";
import Button from "../layout/Button";
import axios from "axios";

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

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/alunos", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setAlunos(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function createAluno() {
    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:8080/alunos", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
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
            alunos.map((aluno) => <Card aluno={aluno} />)
          ) : (
            <p>Nenhum aluno adicionado</p>
          )}
        </div>
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Criar Novo Aluno</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formNome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formDataNascimento">
                    <Form.Label>Data de nascimento</Form.Label>
                    <Form.Control
                      type="date"
                      name="dataNascimento"
                      value={formData.dataNascimento}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formNomeMae">
                    <Form.Label>Mãe</Form.Label>
                    <Form.Control
                      type="text"
                      name="nomeMae"
                      value={formData.nomeMae}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formNomePai">
                    <Form.Label>Pai</Form.Label>
                    <Form.Control
                      type="text"
                      name="nomePai"
                      value={formData.nomePai}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group controlId="formSexo">
                    <Form.Label>Sexo</Form.Label>
                    <Form.Select
                      name="sexo"
                      value={formData.sexo}
                      onChange={handleChange}
                    >
                      <option value="">Selecione...</option>
                      <option value="F">Feminino</option>
                      <option value="M">Masculino</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="formTelefone">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control
                      type="text"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="formNumero">
                    <Form.Label>Número</Form.Label>
                    <Form.Control
                      type="number"
                      name="numero"
                      value={formData.numero}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formRua">
                    <Form.Label>Rua</Form.Label>
                    <Form.Control
                      type="text"
                      name="rua"
                      value={formData.rua}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formBairro">
                    <Form.Label>Bairro</Form.Label>
                    <Form.Control
                      type="text"
                      name="bairro"
                      value={formData.bairro}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <Form.Group controlId="formCidade">
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control
                      type="text"
                      name="cidade"
                      value={formData.cidade}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
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
