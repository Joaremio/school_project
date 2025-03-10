import styles from "./Button.module.css"
export default function Button({text, type, tarefa}){
    return(
        <>
            <button className={styles[type]} onClick={tarefa}>{text}</button>
        </>
    )
}