import axios from "axios";
import { Component, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./user.module.css";

function loadUser(id) {
    console.log("id: " + id);
    return axios.get("/api/user/", { params: { username: id } });
}

function UserComponent(props) {
    let { id } = useParams();

    const [user, setUser] = useState(null);

    loadUser(id).then(result => { setUser(result.data) });

    if (user) {
        return (
            <div id={styles.formAlignmentContainer}>
                <div id={styles.signUpForm} className="ContainerContent">
                    <div className="formHeader">
                        <h1>User info</h1>
                    </div>
                    <div className="containerContent">
                        <dl>
                            <dt>Username</dt>
                            <dd>{user.username}</dd>
                            <dt>Name</dt>
                            <dd>{user.name}</dd>
                            <dt>Surname</dt>
                            <dd>{user.surname}</dd>
                            <dt>Email</dt>
                            <dd><a href={"mailto:" + user.email}>{user.email}</a></dd>
                            <dt>Birthdate</dt>
                            <dd>{user.birthdate}</dd>
                        </dl>
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
    };
}

export default connect(mapStateToProps)(UserComponent);