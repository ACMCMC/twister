import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./user.module.css";

function loadUser(id) {
    axios.get("/api/users/", {username: id})
}

function UserComponent(props) {
    let { id } = useParams();

    if (props.users[id]) {
        return (
            <div id={styles.formAlignmentContainer}>
                <div id={styles.signUpForm} className="ContainerContent">
                    <div className="formHeader">
                        <h1>User info</h1>
                    </div>
                    <div className="containerContent">
                        <form>
                            <div className={styles.field}>
                                <label>Username
                                </label>
                                <input type="text" id={styles.login} name="username" value={props.user.username} />
                            </div>
                            <div id={styles.rowNomPrenom} className={styles.field}>
                                <div className={styles.verticalDiv}>
                                    <label>Name
                                    </label>
                                    <input id={styles.prenom} name="prenom" type="text" defaultValue={props.user.name} />
                                </div>
                                <div className={styles.verticalDiv}>
                                    <label>Surname
                                    </label>
                                    <input id={styles.nom} name="nom" type="text" defaultValue={props.user.surname} />
                                </div>
                            </div>
                            <div className={styles.field}>
                                <label>Email
                                </label>
                                <input type="email" id={styles.login} name="email" defaultValue={props.user.email} />
                            </div>
                            <div className={styles.field}>
                                <label>Birthdate
                                </label>
                                <input type="date" id={styles.login} name="birthdate" defaultValue={props.user.birthdate} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div id={styles.formAlignmentContainer}>
                <div id={styles.signUpForm} className="ContainerContent">
                    <div className="formHeader">
                        <h1>User info</h1>
                    </div>
                    <div className="containerContent">
                        <p>User with ID {id} not found.</p>
                        <div>
                            <Link to="/">
                                <button className="regularButton primaryButton">Go home</button>
                                </Link>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.users.users
    };
}

export default connect(mapStateToProps)(UserComponent);