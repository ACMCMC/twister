import axios from "axios";
import { Component, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./user.module.css";
import { loadFollowing, loadFollowers } from "../feed/Feed.js";

function loadUser(id) {
    return axios.get("/api/user/", { params: { username: id } });
}

function follow(dispatch, id, currentUserId) {
    axios.put("/api/user/follow", { username: id }).then((resp) => {
        loadFollowing(dispatch, currentUserId);
    });
}

function unfollow(dispatch, id, currentUserId) {
    axios.put("/api/user/unfollow", { username: id }).then((resp) => {
        loadFollowing(dispatch, currentUserId);
    });
}

function UserComponent(props) {
    let { id } = useParams();
    const dispatch = useDispatch();
    const navigation = useNavigate();

    if (id === props.currentUserId) {
        navigation("/profile");
    }

    const [user, setUser] = useState(null); // Local state: the user we're looking at

    useEffect(() => {
        // Get the data of the user we're looking at
        loadUser(id).then(result => { setUser(result.data) }).catch(error => { console.error(error) });
    }, []);

    useEffect(() => {
        // Load our followers and people we're following
        if (props.currentUserId) {
            loadFollowing(dispatch, props.currentUserId);
            loadFollowers(dispatch, props.currentUserId);
        }
    }, [props.currentUserId]);

    const currentUserFollowing = props.following.includes(id);
    const followsCurrentUser = props.followers.includes(id);
    console.log(props.followers, props.currentUserId);

    if (user) {
        return (
            <div id={styles.formAlignmentContainer}>
                <div id={styles.userBox} className="ContainerContent">
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
                        <p id={styles.followInformation}>{followsCurrentUser ? "Follows you" : "Doesn't follow you"}</p>
                        <button onClick={() => { currentUserFollowing ? unfollow(dispatch, id, props.currentUserId) : follow(dispatch, id, props.currentUserId) }} className="regularButton primaryButton">{currentUserFollowing ? "Unfollow" : "Follow"}</button>
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
    const currentUser = state.authentication.user;
    if (currentUser) {
        return {
            following: state.users.following,
            followers: state.users.followers,
            currentUserId: currentUser.username,
        };
    } else {
        return {
            following: [],
            followers: [],
            currentUserId: null,
        };
    }
}

export default connect(mapStateToProps)(UserComponent);