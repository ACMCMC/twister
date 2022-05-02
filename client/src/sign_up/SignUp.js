import styles from "./sign_up.module.css";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import axios from "axios";
import { login } from "../features/authentication/authenticationSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { request_login } from "../login/Login";

async function request_sign_up(dispatch, navigate, passwordRef, nameRef, surnameRef, usernameRef, birthdateRef, emailRef) {
    axios.post("/api/public/register", { username: usernameRef.current.value, password: passwordRef.current.value, birthdate: birthdateRef.current.value, name: nameRef.current.value, surname: surnameRef.current.value, email: emailRef.current.value })
        .then((result) => {
            request_login(dispatch, navigate, usernameRef.current.value, passwordRef.current.value);
        })
        .catch((error) => alert(error));
}

export function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    const surnameRef = useRef();
    const birthdateRef = useRef();

    return (
        <div id={styles.formAlignmentContainer}>
            <div id={styles.signUpForm} className="ContainerContent">
                <div className="formHeader">
                    <h1>Sign up</h1>
                </div>
                <div className="containerContent">
                    <form>
                        <div id={styles.rowNomPrenom} className={styles.field}>
                            <div className={styles.verticalDiv}>
                                <label>Name
                                </label>
                                <input id={styles.prenom} name="prenom" type="text" ref={nameRef} />
                            </div>
                            <div className={styles.verticalDiv}>
                                <label>Surname
                                </label>
                                <input id={styles.nom} name="nom" type="text" ref={surnameRef} />
                            </div>
                        </div>
                        <div className={styles.field}>
                            <label>Username
                            </label>
                            <input type="text" id={styles.login} name="username" ref={usernameRef} />
                        </div>
                        <div className={styles.field}>
                            <label>Email
                            </label>
                            <input type="email" id={styles.login} name="email" ref={emailRef} />
                        </div>
                        <div className={styles.field}>
                            <label>Birthdate
                            </label>
                            <input type="date" id={styles.login} name="birthdate" ref={birthdateRef} />
                        </div>
                        <div className={styles.field}>
                            <label>Password
                            </label>
                            <input type="password" id={styles.password} name="password" ref={passwordRef} />
                        </div>
                        <div className={styles.field}>
                            <label for="passwordRewrite">Password rewrite
                            </label>
                            <input type="password" id={styles.passwordRewrite} name="passwordRewrite" />
                        </div>
                        <div id={styles.buttonsRow}>
                            <button type="button" className="regularButton primaryButton" id={styles.btnConnexion} onClick={() => request_sign_up(dispatch, navigate, passwordRef, nameRef, surnameRef, usernameRef, birthdateRef, emailRef)}>Sign up</button>
                            <Link to="/" className="regularButton secondaryButton">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}