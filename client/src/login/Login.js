import axios from "axios";
import { Component, useRef } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/authentication/authenticationSlice";
import styles from "./login.module.css";

async function request_login(dispatch, loginRef, passwordRef) {
    axios.get("/api/authentication/login", { params: { login: loginRef.current.value, password: passwordRef.current.value } })
    .then((result) => dispatch(login({ token: result.data.token })))
    .catch((error) => alert(error));
}


function Login() {
    const dispatch = useDispatch();
    
    const loginRef = useRef();
    const passwordRef = useRef();

    return (
        <div className={styles.formContainer}>
            <form id={styles.loginForm} className={"containerContent"}>
                <h1>Ouvrir une session</h1>
                <div className={styles.field}>
                    <label>Login
                        <input id={styles.login} name="login" type="email" ref={loginRef} /></label>
                </div>
                <div className={styles.field}>
                    <label>Mot de Passe
                        <input type="password" id={styles.password} name="password" ref={passwordRef} />
                    </label>
                </div>
                <div id="buttonsRow">
                    <button className="regularButton primaryButton" id={styles.btnConnexion} onClick={() => request_login(dispatch, loginRef, passwordRef)}>Connexion</button>
                    <input type="button" className="regularButton secondaryButton" value="Annuler" />
                </div>
            </form>
        </div>
    );
}

export { Login };