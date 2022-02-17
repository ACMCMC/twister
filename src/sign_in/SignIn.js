import { Component } from "react";
import "./sign_in.css"

class SignIn extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="formAlignmentContainer">
                <div className="generalContainer">
                    <div className="formHeader">
                        <h1>Enregistrement</h1>
                    </div>
                    <div className="containerContent">
                        <form action="/connexion" method="post">
                            <div id="rowNomPrenom" className="field">
                                <div className="verticalDiv">
                                    <label>Prenom
                                        <input id="prenom" name="prenom" type="text" />
                                    </label>
                                </div>
                                <div className="verticalDiv">
                                    <label>Nom
                                        <input id="nom" name="nom" type="text" />
                                    </label>
                                </div>
                            </div>
                            <div className="field">
                                <label>Login
                                    <input type="email" id="login" name="login" />
                                </label>
                            </div>
                            <div className="field">
                                <label>Mot de Passe
                                    <input type="password" id="password" name="password" />
                                </label>
                            </div>
                            <div className="field">
                                <label for="passwordRewrite">Retapez
                                    <input type="passwordRewrite" id="passwordRewrite" name="passwordRewrite" />
                                </label>
                            </div>
                            <div id="buttonsRow">
                                <button className="regularButton primaryButton" id="btnConnexion" type="submit">Connexion</button>
                                <input type="button" className="regularButton secondaryButton" onClick="window.location.href='./main.html'" value="Annuler" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export { SignIn };