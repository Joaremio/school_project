import Button from "../layout/Button";
import styles from "./Form.module.css";
import { useState, useEffect } from "react";

export default function Form({ handleSubmit, btn, alunoEdit }) {
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
    if (alunoEdit) {
      setFormData({
        nome: alunoEdit.nome || "",
        telefone: alunoEdit.telefone || "",
        nomeMae: alunoEdit.nomeMae || "",
        nomePai: alunoEdit.nomePai || "",
        sexo: alunoEdit.sexo || "",
        dataNascimento: alunoEdit.dataNascimento || "",
        rua: alunoEdit.endereco?.rua || "",
        numero: alunoEdit.endereco?.numero || "",
        bairro: alunoEdit.endereco?.bairro || "",
        cidade: alunoEdit.endereco?.cidade || "",
        id: alunoEdit.id,
      });
    }
  }, [alunoEdit]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function resetForm() {
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
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <form
        className={`row g-3  ${styles.formulario}`}
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(formData, resetForm);
        }}
      >
        <div className="col-md-6">
          <label htmlFor="nome" className="form-label">
            Nome
          </label>
          <input
            type="text"
            className="form-control"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            placeholder="Digite o nome completo"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="data_nascimento" className="form-label">
            Data de Nascimento
          </label>
          <input
            type="date"
            className="form-control"
            id="dataNascimento"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="mae" className="form-label">
            Mãe
          </label>
          <input
            type="text"
            className="form-control"
            id="nomeMae"
            name="nomeMae"
            value={formData.nomeMae}
            onChange={handleChange}
            required
            placeholder="Digite o nome da mãe"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="pai" className="form-label">
            Pai
          </label>
          <input
            type="text"
            className="form-control"
            id="nomePai"
            name="nomePai"
            value={formData.nomePai}
            onChange={handleChange}
            placeholder="Digite o nome do pai"
          />
        </div>
        <div className="col-6">
          <label htmlFor="rua" className="form-label">
            Rua
          </label>
          <input
            type="text"
            className="form-control"
            id="rua"
            name="rua"
            value={formData.rua}
            onChange={handleChange}
            required
            placeholder="Digite o nome da rua"
          />
        </div>
        <div className="col-6">
          <label htmlFor="numero" className="form-label">
            Número
          </label>
          <input
            type="text"
            className="form-control"
            id="numero"
            placeholder="Digite o número"
            name="numero"
            value={formData.numero}
            required
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <label htmlFor="bairro" className="form-label">
            Bairro
          </label>
          <input
            type="text"
            className="form-control"
            id="bairro"
            name="bairro"
            value={formData.bairro}
            placeholder="Digite o nome do bairro"
            required
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <label htmlFor="telefone" className="form-label">
            Telefone
          </label>
          <input
            type="text"
            className="form-control"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            placeholder="Digite o numero para contato"
            required
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="cidade" className="form-label">
            Cidade
          </label>
          <input
            type="text"
            className="form-control"
            id="cidade"
            name="cidade"
            value={formData.cidade}
            placeholder="Digite o nome da cidade"
            required
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputState" className="form-label">
            Sexo
          </label>
          <select
            id="inputState"
            className="form-select"
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
            required
          >
            <option selected>Selecione o sexo</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </select>
        </div>
        <div className="col-12 align-items-center d-flex justify-content-center">
          <Button text={btn} type="btn" />{" "}
        </div>
      </form>
    </div>
  );
}
