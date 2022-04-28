import axios from "axios";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/authentication/authenticationSlice";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";

async function request_login(dispatch, navigate, loginVal, passwordVal) {
    axios.post("/api/public/login", { login: loginVal, password: passwordVal })
    .then((result) => {
        axios.get("/api/public/get_session_status").then(
            (result2) => {
                console.log(result2.data);
                dispatch(login({
                    user: result2.data.user
                }));
                navigate("/");
            }
        );
    })
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
                    <button type="button" className="regularButton primaryButton" id={styles.btnConnexion} onClick={() => request_login(dispatch, navigate, loginRef.current.value, passwordRef.current.value)}>Connexion</button>
                    <Link to="/">
                        <input type="button" className="regularButton secondaryButton" value="Annuler" />
                    </Link>
                </div>
            </form>
        </div>
    );
}

export { Login, request_login };