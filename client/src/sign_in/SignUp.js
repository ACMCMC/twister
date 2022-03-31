import styles from "./sign_in.module.css";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import axios from "axios";
import { login } from "../features/authentication/authenticationSlice";
import { Link } from "react-router-dom";

async function request_sign_up(dispatch, loginRef, passwordRef, nameRef, surnameRef, usernameRef, birthdateRef) {
    axios.get("/api/authentication/sign_up", { params: { login: loginRef.current.value, password: passwordRef.current.value, username: usernameRef.current.value, birthdate: birthdateRef.current.value, name: nameRef.current.value, surname: surnameRef.current.value } })
    .then((result) => dispatch(login({ token: result.data.token })))
    .catch((error) => alert(error));
}

export function SignUp() {
    const dispatch = useDispatch();

    const loginRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    const surnameRef = useRef();
    const usernameRef = useRef();
    const birthdateRef = useRef();

    return (
        <div id={styles.formAlignmentContainer}>
            <div id={styles.signUpForm} className="ContainerContent">
                <div className="formHeader">
                    <h1>Enregistrement</h1>
                </div>
                <div className="containerContent">
                    <form action="/connexion" method="post">
                        <div id={styles.rowNomPrenom} className={styles.field}>
                            <div className={styles.verticalDiv}>
                                <label>Prenom
                                    <input id={styles.prenom} name="prenom" type="text" ref={nameRef} />
                                </label>
                            </div>
                            <div className={styles.verticalDiv}>
                                <label>Nom
                                    <input id={styles.nom} name="nom" type="text" ref={surnameRef} />
                                </label>
                            </div>
                        </div>
                        <div className={styles.field}>
                            <label>Login
                                <input type="email" id={styles.login} name="login" ref={loginRef} />
                            </label>
                        </div>
                        <div className={styles.field}>
                            <label>Username
                                <input type="text" id={styles.login} name="username" ref={usernameRef} />
                            </label>
                        </div>
                        <div className={styles.field}>
                            <label>Birthdate
                                <input type="date" id={styles.login} name="birthdate" ref={birthdateRef} />
                            </label>
                        </div>
                        <div className={styles.field}>
                            <label>Mot de Passe
                                <input type="password" id={styles.password} name="password" ref={passwordRef} />
                            </label>
                        </div>
                        <div className={styles.field}>
                            <label for="passwordRewrite">Retapez
                                <input type="password" id={styles.passwordRewrite} name="passwordRewrite" />
                            </label>
                        </div>
                        <div id={styles.buttonsRow}>
                            <button className="regularButton primaryButton" id={styles.btnConnexion} onClick={() => request_sign_up(dispatch, loginRef, passwordRef, nameRef, surnameRef, usernameRef, birthdateRef)}>Connexion</button>
                            <Link to="/">
                                <input type="button" className="regularButton secondaryButton" value="Annuler" />
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}