import { Component } from "react";
import { Login } from "../login/Login";
import styles from "./nav.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authentication/authenticationSlice";

export function NavigationPannel() {
    const authenticated = useSelector(state => state.authentication.isAuthenticated);
    const dispatch = useDispatch();

    if (authenticated) {
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
                        <button className="regularButton" onClick={() => dispatch(logout())}>Se déconnecter</button>
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
