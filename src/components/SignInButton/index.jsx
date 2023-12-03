import styles from './index.module.css'

export function SignInButton({text}) {
    return(
        <input type='submit' value={text} className={styles.btn_primary}/>
    )
}