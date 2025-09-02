import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CardTurma from "../../layout/CardTurma/CardTurma";
import Sidebar from "../../layout/Sidebar"; // 🔹 Importando a sidebar
import styles from "../Alunos.module.css";
import Button from "../../layout/Button";
import api from "../../../api/axios";
import { Modal, Button as BootstrapButton, Form } from "react-bootstrap";

export default function TurmaPage() {
  const { id } = useParams();
  const [turmas, setTurmas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    vagas: "",
    turno: "",
  });

  useEffect(() => {
    api
      .get("/turmas")
      .then((resp) => {
        setTurmas(resp.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar Turmas:", err);
      });
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function createTurma() {
    // 🔹 3. SUBSTITUA O FETCH PELO API.POST
    // O token e o "Content-Type" são adicionados automaticamente.
    api
      .post("/turmas", formData) // O segundo argumento já é o body
      .then((resp) => {
        const novaTurma = resp.data;
        setTurmas((prev) => [...prev, novaTurma]);
        setShowModal(false);
        setFormData({ vagas: "", turno: "" });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar fixa à esquerda */}
      <Sidebar />

      {/* Conteúdo principal */}
      <section className="flex-1 p-8">
        <div className={styles.title_container}>
          <h1 className="text-2xl font-bold mb-4">Suas Turmas</h1>
          <Button
            text="Criar turma"
            type="btn"
            tarefa={() => setShowModal(true)}
          />
        </div>

        <div className={styles.alunos_container}>
          {turmas.length > 0 ? (
            turmas.map((turma) => <CardTurma key={turma.id} turma={turma} />)
          ) : (
            <p className="text-gray-600">Nenhuma turma foi criada...</p>
          )}
        </div>

        {/* Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Criar Nova Turma</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formVagas">
                <Form.Label>Quantidade de Vagas</Form.Label>
                <Form.Control
                  type="number"
                  name="vagas"
                  value={formData.vagas}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formTurno" className="mt-3">
                <Form.Label>Turno</Form.Label>
                <Form.Select
                  name="turno"
                  value={formData.turno}
                  onChange={handleChange}
                >
                  <option value="">Selecione...</option>
                  <option value="MATUTINO">Matutino</option>
                  <option value="VESPERTINO">Vespertino</option>
                  <option value="NOTURNO">Noturno</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <BootstrapButton
              variant="secondary"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </BootstrapButton>
            <BootstrapButton variant="primary" onClick={createTurma}>
              Criar
            </BootstrapButton>
          </Modal.Footer>
        </Modal>
      </section>
    </div>
  );
}
