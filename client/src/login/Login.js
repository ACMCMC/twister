import { Component } from "react";
import styles from "./login.module.css";

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.formContainer}>
                <form action="/connexion" method="post" id={styles.loginForm} className={"containerContent"}>
                    <h1>Ouvrir une session</h1>
                    <div className={styles.field}>
                        <label>Login
                            <input id={styles.login} name="login" type="email" /></label>
                    </div>
                    <div className={styles.field}>
                        <label>Mot de Passe
                            <input type="password" id={styles.password} name="password" />
                        </label>
                    </div>
                    <div id="buttonsRow">
                        <button className="regularButton primaryButton" id={styles.btnConnexion} type="submit">Connexion</button>
                        <input type="button" className="regularButton secondaryButton" value="Annuler" />
                    </div>
                </form>
            </div>
        );
    }
}

export { Login };