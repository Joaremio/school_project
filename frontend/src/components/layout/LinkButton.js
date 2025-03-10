
import styles from "./LinkButton.module.css"
import {Link} from "react-router-dom"

export default function LinkButton({to, text, tarefa}){
    return(
        <Link to={to} className={styles.btn} onClick={tarefa} >
            {text}
        </Link>
    )
}


