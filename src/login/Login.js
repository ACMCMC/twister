import { Component } from "react";
import "./login.css";

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="formContainer" className="generalContainer">
                <form action="/connexion" method="post">
                    <h1>Ouvrir une session</h1>
                    <div className="field">
                        <label>Login
                            <input id="login" name="login" type="email" /></label>
                    </div>
                    <div className="field">
                        <label>Mot de Passe
                            <input type="password" id="password" name="password" />
                        </label>
                    </div>
                    <div id="buttonsRow">
                        <button className="regularButton primaryButton" id="btnConnexion" type="submit">Connexion</button>
                        <input type="button" className="regularButton secondaryButton" value="Annuler" />
                    </div>
                </form>
            </div>
        );
    }
}

export { Login };