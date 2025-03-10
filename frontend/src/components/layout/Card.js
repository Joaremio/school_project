import styles from "./Card.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LinkButton from "./LinkButton";

export default function Card({ aluno }) {
  return (
    <div className={`card ${styles.cardContainer}`}>
      <div className="d-flex">
        <img 
          src="https://t3.ftcdn.net/jpg/08/05/28/22/360_F_805282248_LHUxw7t2pnQ7x8lFEsS2IZgK8IGFXePS.jpg" 
          className={`card-img-top ${styles.cardImg}`} 
          alt="Imagem do card" 
        />
        <div className={`card-body ${styles.cardBody}`}>
          <h5 className={`card-title ${styles.cardTitle}`}>{aluno.nome}</h5>
          <ul className="list-group list-group-flush">
            <li className={`list-group-item ${styles.cardItem}`}><span>Matrícula:</span>{aluno.matricula}</li>
          </ul>
        </div>
      </div>
      <div className="card-body d-flex justify-content-center">
        <LinkButton to={`/ficha/${aluno.id}`} text="Detalhes" />
      </div>
    </div>
  );
}
