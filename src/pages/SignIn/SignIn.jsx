import styles from '../SignUp/index.module.css'
import { GoogleLogInButton } from '../../components/GoogleButton';
import { SignInButton } from '../../components/SignInButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons'
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';

export function SignIn() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [, setUser] = useState(null);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const proceedLogin = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch(`http://localhost:8000/user?email=${email}`);
          const userData = await response.json();
    
          if (userData.length === 1 && userData[0].password === password) {
            setUser(userData[0]);
            navigate("/analyze", { state: { user: userData[0] } });
          } else {
            alert('Invalid email or password');
          }
        } catch (err) {
          alert('Something went wrong' + err);
        }
      };

    return(
        <div className={styles.wrapper}>
            <h1 className={styles.heading}>Sign in</h1>
            <p className={styles.info_text}>Enter your credentials</p>
            <GoogleLogInButton/>
            <div className={styles.divider}>
                <div className={styles.line}></div>
                <span className={styles.or_text}>or</span>
                <div className={styles.line}></div>
            </div>
            <form onSubmit={proceedLogin} action="">
                <input className={styles.input} type="email" value={email} name="email" id="email"  placeholder="Email" onChange={(e)=> setEmail(e.target.value)} />
                <div className={styles.psw_field}>
                    <input className={styles.input} name="password" id="password" placeholder="Password" 
                    type={ showPassword ? "text" : "password" }
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    />
                    <FontAwesomeIcon
                        onClick={togglePasswordVisibility} 
                        className={styles.eye_icon} 
                        icon={ showPassword ? faEyeSlash : faEye} 
                    />
                </div>
                <SignInButton text="Sign in" />
            </form>
            <p className={styles.option_text} >Didn't have account yet?<Link to="/signup" className={styles.option_link}>Sign up</Link></p>
        </div>
    )
}