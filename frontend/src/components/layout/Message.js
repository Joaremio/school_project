import styles from './Message.module.css'


export default function Message({type, msg}){
    return(
        <p className={styles[type]}>{msg}</p>
    )
}