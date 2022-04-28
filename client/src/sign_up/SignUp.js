import styles from "./sign_up.module.css";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import axios from "axios";
import { login } from "../features/authentication/authenticationSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

async function request_sign_up(dispatch, navigate, passwordRef, nameRef, surnameRef, usernameRef, birthdateRef, emailRef) {
    axios.post("/api/user/register", { username: usernameRef.current.value, password: passwordRef.current.value, birthdate: birthdateRef.current.value, name: nameRef.current.value, surname: surnameRef.current.value, email: emailRef.current.value})
    .then((result) => {dispatch(login({ token: result.data.token })); navigate("/");})
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
                    <h1>Enregistrement</h1>
                </div>
                <div className="containerContent">
                    <form>
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
                            <label>Username
                                <input type="text" id={styles.login} name="username" ref={usernameRef} />
                            </label>
                        </div>
                        <div className={styles.field}>
                            <label>Email
                                <input type="email" id={styles.login} name="email" ref={emailRef} />
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
                            <button type="button" className="regularButton primaryButton" id={styles.btnConnexion} onClick={() => request_sign_up(dispatch, navigate, passwordRef, nameRef, surnameRef, usernameRef, birthdateRef, emailRef)}>Connexion</button>
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