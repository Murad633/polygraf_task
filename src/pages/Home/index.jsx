import { Link } from 'react-router-dom'
import styles from './index.module.css'
export function Home() {
    return(
        <div className={styles.container}>
            <div className={styles.btn_wrapper}>
                <Link className={styles.btn} to="/signin">Sign In</Link>
                <Link className={styles.btn} to="/signup">Sign Up</Link>
            </div>
        </div>
    )
}