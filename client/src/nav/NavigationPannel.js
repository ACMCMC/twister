import { Component } from "react";
import { Login } from "../login/Login";
import styles from "./nav.module.css";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authentication/authenticationSlice";
import { Logout } from "../logout/Logout";

export function NavigationPannel(props) {
    if (props.isAuthenticated) {
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
                                <button className={"regularButton"} type="submit" id={styles.btnSearch}>Search</button>
                                <input type="checkbox" id={styles.checkboxContacts} />
                                <label htmlFor="checkboxContacts" id={styles.labelCheckboxContacts}>Just my contacts</label>
                            </div>
                        </form>
                    </div>
                    <div>
                        Welcome, <Link to="/profile">
                            <span>{props.username}</span>
                        </Link>
                    </div>
                    <div id={styles.linksLogin}>
                        <Logout></Logout>
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
                                <button className={"regularButton"} type="submit" id={styles.btnSearch}>Search</button>
                                <input type="checkbox" id={styles.checkboxContacts} />
                                <label htmlFor="checkboxContacts" id={styles.labelCheckboxContacts}>Just my contacts</label>
                            </div>
                        </form>
                    </div>
                    <div id={styles.linksLogin}>
                        <Link to="/login">
                            <button className="regularButton">Log in</button>
                        </Link>
                        <Link to="/sign_up">
                            <button className="regularButton">Sign up</button>
                        </Link>
                    </div>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    if (state.authentication.user) {
        return {
            isAuthenticated: true,
            username: state.authentication.user.username
        };
    } else {
        return { isAuthenticated: false };
    }
}

export default connect(mapStateToProps)(NavigationPannel);