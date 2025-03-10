
import Button from "../layout/Button";
import styles from "./Form.module.css"
import { useState, useEffect } from "react";

export default function Form({ handleSubmit, btn, alunoEdit}) {


  const [turmas, setTurmas] = useState([]);
  
      useEffect(() => {
          fetch('http://localhost:8080/turmas')  // Requisição para buscar as turmas no backend
              .then(response => response.json())
              .then(data => setTurmas(data))
              .catch(error => console.error('Erro ao buscar turmas:', error));
      }, []);
  
  const [endereco, setEndereco] = useState({
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
  });

  const [formData, setFormData] = useState(alunoEdit || {
    nome: "",
    nascimento: "",
    telefone: "",
    sexo: "",
    inscricao: "",
    mae: "",
    pai: "",
    endereco: endereco, 
    turmaId: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    // Se o campo for um campo do endereço, atualize o estado de endereco
    if (name in endereco) {
      setEndereco({
        ...endereco,
        [name]: value,
      });

      // Atualize o formData com o novo endereco
      setFormData({
        ...formData,
        endereco: {
          ...formData.endereco,
          [name]: value,  // Atualize o campo dentro de endereco
        },
      });
    } else {
      // Caso contrário, atualize o formData normalmente
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  }


  function resetForm() {
    setFormData({
      nome: "",
      nascimento: "",
      telefone: "",
      sexo: "",
      inscricao: "",
      mae: "",
      pai: "",
      endereco: {
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
      },
      turmaId: "",
    });
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <form className={`row g-3  ${styles.formulario}`} onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(formData,resetForm);
      }}>
        <div className="col-md-6">
          <label htmlFor="nome" className="form-label">Nome</label>
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
          <label htmlFor="data_nascimento" className="form-label">Data de Nascimento</label>
          <input
            type="date"
            className="form-control"
            id="data_nascimento"
            name="nascimento"  // Certifique-se de que o nome do campo corresponda
            value={formData.nascimento}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="mae" className="form-label">Mãe</label>
          <input
            type="text"
            className="form-control"
            id="mae"
            name="mae"
            value={formData.mae}
            onChange={handleChange}
            required
            placeholder="Digite o nome da mãe"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="pai" className="form-label">Pai</label>
          <input
            type="text"
            className="form-control"
            id="pai"
            name="pai"
            value={formData.pai}
            onChange={handleChange}
            placeholder="Digite o nome do pai"
          />
        </div>
        <div className="col-6">
          <label htmlFor="rua" className="form-label">Rua</label>
          <input
            type="text"
            className="form-control"
            id="rua"
            name="rua"
            value={formData.endereco.rua}
            onChange={handleChange}
            required
            placeholder="Digite o nome da rua"
          />
        </div>
        <div className="col-6">
          <label htmlFor="numero" className="form-label">Número</label>
          <input
            type="number"
            className="form-control"
            id="numero"
            placeholder="Digite o número"
            name="numero"
            value={formData.endereco.numero}
            required
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <label htmlFor="bairro" className="form-label">Bairro</label>
          <input
            type="text"
            className="form-control"
            id="bairro"
            name="bairro"
            value={formData.endereco.bairro}
            placeholder="Digite o nome do bairro"
            required
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <label htmlFor="telefone" className="form-label">Contato</label>
          <input
            type="number"
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
          <label htmlFor="cidade" className="form-label">Cidade</label>
          <input
            type="text"
            className="form-control"
            id="cidade"
            name="cidade"
            value={formData.endereco.cidade}
            placeholder="Digite o nome da cidade"
            required
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inscricao" className="form-label">Data da matrícula</label>
          <input
            type="date"
            className="form-control"
            id="inscricao"
            name="inscricao"
            value={formData.inscricao}
            onChange={handleChange}
          />
        </div>

        

      <div className="col-md-6">
      <label htmlFor="inputState" className="form-label">Sexo</label>
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


        
      <div class="col-md-6">
        <label for="inputState" class="form-label">Turma</label>
        <select id="inputState" class="form-select" 
        className="form-select"
        name="turmaId"
        value={formData.turmaId}
        onChange={handleChange}
        required>
        <option selected >Escolha o turno</option>
        {turmas.map((turma) => (
              <option key={turma.id} value={turma.id}>
                {turma.nome} {/* Exibe o nome da turma */}
              </option>
            ))}
        </select>
        </div>
        <div className="col-12 align-items-center d-flex justify-content-center">
          <Button text={btn} type="btn" />  {/* Botão pequeno e com largura 100% */}
        </div>
      </form>
    </div>
  );
} 