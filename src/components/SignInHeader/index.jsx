import { Link } from 'react-router-dom';
import styles from './index.module.css';
import logo from './logo.svg';

export function SignInHeader() {
    return(
        <header className={styles.signIn_header}>
            <Link to="/">
                <img src={logo} alt="" />
            </Link>
        </header>
    )
}