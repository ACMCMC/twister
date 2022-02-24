import { Component } from "react";
import { Login } from "../login/Login";
import styles from "./nav.module.css";

class NavigationPannel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isConnected) {
            return (
                <nav className={styles.NavigationPannel}>
                    <Login></Login>
                </nav>
            );
        } else {
            return (
                <nav className={styles.NavigationPannel}>
                    <div id={styles.header}>
                        <div id={styles.logo}>
                            <img src={require('./logo.png')}/>
                        </div>
                        <div id={styles.search}>
                            <form action="/search" method="post">
                                <div id={styles.searchForm}>
                                    <input type="text" id={styles.searchText} />
                                    <button className={"regularButton"} type="submit" id={styles.btnSearch}>Rechercher</button>
                                    <input type="checkbox" id={styles.checkboxContacts} />
                                    <label for="checkboxContacts" id={styles.labelCheckboxContacts}>Seulement mes contacts</label>
                                </div>
                            </form>
                        </div>
                        <div id={styles.linksLogin}>
                            <input type="button" className="regularButton" onclick="window.location.href='./login.html'" value="Connexion" />
                            <input type="button" className="regularButton" onclick="window.location.href='./register.html'" value="Enregistrement" />
                        </div>
                    </div>
                </nav>
            );
        }
    }
}

export { NavigationPannel };
