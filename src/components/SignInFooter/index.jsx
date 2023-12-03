import { Link } from 'react-router-dom';
import styles from './index.module.css'

export function SignInFooter() {
    return (
        <footer className={styles.footer}>
            <Link className={styles.link} to='/'><p className={styles.text} >Privacy Policy</p></Link>
            <Link className={styles.link} to='/'><p className={styles.text} >Need help?</p></Link>
        </footer>
    );
}
