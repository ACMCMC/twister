import axios from "axios";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/authentication/authenticationSlice";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

async function request_login(dispatch, navigate, loginVal, passwordVal) {
    axios.post("/api/public/login", { login: loginVal, password: passwordVal })
        .then((result) => {
            axios.get("/api/public/get_session_status").then(
                (result2) => {
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
        <div id={styles.formAlignmentContainer}>
            <div className={styles.formContainer}>
                <div className="formHeader">
                    <h1>Login</h1>
                </div>
                <form id={styles.loginForm} className={"containerContent"}>
                    <div className={styles.field}>
                        <label>Username</label>
                        <input id={styles.login} name="login" type="text" ref={loginRef} />
                    </div>
                    <div className={styles.field}>
                        <label>Password</label>
                        <input type="password" id={styles.password} name="password" ref={passwordRef} />
                    </div>
                    <div id={styles.buttonsRow}>
                        <button type="button" className="regularButton primaryButton" id={styles.btnConnexion} onClick={() => request_login(dispatch, navigate, loginRef.current.value, passwordRef.current.value)}>Login</button>
                        <Link to="/" className="regularButton secondaryButton" value="Cancel"> Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export { Login, request_login };