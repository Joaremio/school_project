import myImagine from '../../images/logo.jpeg'
import styles from './Home.module.css'




export default function Home(){
    return (
        <div className={styles.home_container}>
            <div className={styles.img_container}>
                <img src={myImagine} alt="" />
            </div>
            <div className={styles.text_container}>
                <p>Um lugar dedicado ao aprendizado, onde cada aluno recebe atenção especial para fortalecer seu conhecimento e desenvolver seu potencial. Juntos, construindo um futuro melhor!</p>
            </div>
        </div>
    )
}