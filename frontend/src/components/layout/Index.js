import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from "./Index.module.css";  // Seu CSS personalizado
import myImagine from '../../images/logo.jpeg'
import { useEffect, useState } from 'react';

export default function Index() {
    const [turmas, setTurmas] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/turmas')  // Requisição para buscar as turmas no backend
            .then(response => response.json())
            .then(data => setTurmas(data))
            .catch(error => console.error('Erro ao buscar turmas:', error));
    }, []);

    return (
        <nav className={styles.nav_container}>
            <div>
                <img src={myImagine} alt="" />
            </div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/alunos">Alunos</Link></li>
                <li className="nav-item">
                    <Dropdown>
                        <Dropdown.Toggle className={`${styles.navLink} ${styles.dropdownToggle}`} id="dropdown-basic">
                            Turmas
                        </Dropdown.Toggle>
                        <Dropdown.Menu className={styles.dropdownMenu}>
                            {turmas.length > 0 ? (
                                turmas.map(turma => (
                                    <Dropdown.Item
                                        as={Link}
                                        to={`/turma/${turma.id}`}  // Link com o ID correto
                                        key={turma.id}
                                        className={styles.dropdownItem}
                                    >
                                        {turma.nome}  {/* Nome da turma */}
                                    </Dropdown.Item>
                                ))
                            ) : (
                                <Dropdown.Item disabled className={styles.dropdownItem}>Carregando turmas...</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
            </ul>
        </nav>
    );
}

