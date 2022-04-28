import axios from "axios";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/authentication/authenticationSlice";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";

async function request_login(dispatch, navigate, loginRef, passwordRef) {
    axios.post("/api/user/login", { login: loginRef.current.value, password: passwordRef.current.value })
    .then((result) => {dispatch(login({ token: result.data.token })); navigate("/");})
    .catch((error) => alert(error));
}


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const loginRef = useRef();
    const passwordRef = useRef();

    return (
        <div className={styles.formContainer}>
            <form id={styles.loginForm} className={"containerContent"}>
                <h1>Ouvrir une session</h1>
                <div className={styles.field}>
                    <label>Login
                        <input id={styles.login} name="login" type="text" ref={loginRef} /></label>
                </div>
                <div className={styles.field}>
                    <label>Mot de Passe
                        <input type="password" id={styles.password} name="password" ref={passwordRef} />
                    </label>
                </div>
                <div id="buttonsRow">
                    <button type="button" className="regularButton primaryButton" id={styles.btnConnexion} onClick={() => request_login(dispatch, navigate, loginRef, passwordRef)}>Connexion</button>
                    <Link to="/">
                        <input type="button" className="regularButton secondaryButton" value="Annuler" />
                    </Link>
                </div>
            </form>
        </div>
    );
}

export { Login };