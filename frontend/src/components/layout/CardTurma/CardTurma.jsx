import styles from "../Card.module.css";
import LinkButton from "../LinkButton";

export default function CardTurma({ turma }) {
  return (
    <div className={`card ${styles.cardContainer}`}>
      <div className="card-body">
        <h5 className={`card-title ${styles.cardTitle}`}>{turma.codigo}</h5>
        <ul className="list-group list-group-flush">
          <li className={`list-group-item ${styles.cardItem}`}>
            <span>Turno:</span> {turma.turno}
          </li>
        </ul>
        <div className="card-body d-flex justify-content-center">
          <LinkButton to={`/turma/detalhes/${turma.id}`} text="Ver detalhes" />
        </div>
      </div>
    </div>
  );
}
