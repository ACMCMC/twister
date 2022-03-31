import { Component } from "react";
import styles from "./sign_in.module.css";

class SignUp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
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
                                        <input id={styles.prenom} name="prenom" type="text" />
                                    </label>
                                </div>
                                <div className={styles.verticalDiv}>
                                    <label>Nom
                                        <input id={styles.nom} name="nom" type="text" />
                                    </label>
                                </div>
                            </div>
                            <div className={styles.field}>
                                <label>Login
                                    <input type="email" id={styles.login} name="login" />
                                </label>
                            </div>
                            <div className={styles.field}>
                                <label>Mot de Passe
                                    <input type="password" id={styles.password} name="password" />
                                </label>
                            </div>
                            <div className={styles.field}>
                                <label for="passwordRewrite">Retapez
                                    <input type="passwordRewrite" id={styles.passwordRewrite} name="passwordRewrite" />
                                </label>
                            </div>
                            <div id={styles.buttonsRow}>
                                <button className="regularButton primaryButton" id={styles.btnConnexion} type="submit">Connexion</button>
                                <input type="button" className="regularButton secondaryButton" onClick="window.location.href='./main.html'" value="Annuler" />
                            </div>
                        </form>
                    </div>
                </div>
                </div>
        );
    }
}

export { SignUp };