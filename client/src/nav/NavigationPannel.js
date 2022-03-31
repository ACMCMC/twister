import { Component } from "react";
import { Login } from "../login/Login";
import styles from "./nav.module.css";
import { Link } from "react-router-dom";

class NavigationPannel extends Component {
    constructor(props) {
        super(props);
    }

    disconnect() {
        this.props.session.disconnect();
    }

    render() {
        if (this.props.session.isConnected()) {
            return (
                <nav className={styles.NavigationPannel}>
                    <div id={styles.header}>
                        <div id={styles.logo}>
                            <Link to="/">
                                <img id={styles.logoImg} src={require('./logo.png')} />
                            </Link>
                        </div>
                        <div id={styles.search}>
                            <form action="/search" method="post">
                                <div id={styles.searchForm}>
                                    <input type="text" id={styles.searchText} />
                                    <button className={"regularButton"} type="submit" id={styles.btnSearch}>Rechercher</button>
                                    <input type="checkbox" id={styles.checkboxContacts} />
                                    <label htmlFor="checkboxContacts" id={styles.labelCheckboxContacts}>Seulement mes contacts</label>
                                </div>
                            </form>
                        </div>
                        <div id={styles.linksLogin}>
                            <button className="regularButton" onClick={this.disconnect.bind(this)}>Se déconnecter</button>
                        </div>
                    </div>
                </nav>
            );
        } else {
            return (
                <nav className={styles.NavigationPannel}>
                    <div id={styles.header}>
                        <div id={styles.logo}>
                            <Link to="/">
                                <img id={styles.logoImg} src={require('./logo.png')} />
                            </Link>
                        </div>
                        <div id={styles.search}>
                            <form action="/search" method="post">
                                <div id={styles.searchForm}>
                                    <input type="text" id={styles.searchText} />
                                    <button className={"regularButton"} type="submit" id={styles.btnSearch}>Rechercher</button>
                                    <input type="checkbox" id={styles.checkboxContacts} />
                                    <label htmlFor="checkboxContacts" id={styles.labelCheckboxContacts}>Seulement mes contacts</label>
                                </div>
                            </form>
                        </div>
                        <div id={styles.linksLogin}>
                            <Link to="/login">
                                <button className="regularButton">Se connecter</button>
                            </Link>
                            <Link to="/sign_up">
                                <button className="regularButton">S'inscrire</button>
                            </Link>
                        </div>
                    </div>
                </nav>
            );
        }
    }
}

export { NavigationPannel };
