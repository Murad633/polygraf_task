import styles from './index.module.css'
import { GoogleLogInButton } from '../../components/GoogleButton';
import { SignInButton } from '../../components/SignInButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons'
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';

export function SignUp() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`http://localhost:8000/user?email=${email}`);
          const existingUser = await response.json();
    
          if (existingUser.length > 0) {
            alert('This email is already in use. Please use a different email address.');
          } else {
            const newUser = { fullName, email, password };
    
            const registerResponse = await fetch('http://localhost:8000/user', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(newUser),
            });
    
            if (registerResponse.ok) {
              alert('Registered successfully');
              navigate('/signin');
            } else {
              alert('Registration failed');
            }
          }
        } catch (error) {
          alert('Something went wrong: ' + error);
        }
      };

    return(
        <div className={styles.wrapper}>
            <h1 className={styles.heading}>Sign up</h1>
            <p className={styles.info_text}>Create an account</p>
            <GoogleLogInButton/>
            <div className={styles.divider}>
                <div className={styles.line}></div>
                <span className={styles.or_text}>or</span>
                <div className={styles.line}></div>
            </div>
            <form onSubmit={submitHandler} action="">
                <input className={styles.input} type="text" name="fullname" id="fullname" value={fullName} placeholder="Fullname" onChange={(e) => setFullName(e.target.value)}/>
                <input className={styles.input} type="email" name="email" id="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
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
                <SignInButton text="Sign up" />
            </form>
            <p className={styles.option_text} >Have an account?     <Link to="/signin" className={styles.option_link}>Sign in</Link></p>
        </div>
    )
}