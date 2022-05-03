import styles from "./feed.module.css";
import { Component, useState } from "react";
import MessageList from "./MessageList";
import NewMessage from "./NewMessage";
import Statistics from "./Statistics";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import { addMessage } from "../features/messages/messagesSlice";
import {loadStats} from "./Statistics";
import { setFollowers, setFollowing } from "../features/users/usersSlice";

function loadAllMessages(dispatch) {
    axios.get("/api/message/all")
        .then(result => {
            for (let message of result.data) {
                dispatch(addMessage({ message: message }));
            }
        })
        .catch(error => { console.error(error) });
}

function loadFollowers(dispatch, username) {
    axios.get("/api/user/followers", { params: {username: username}}).then((resp) => {
        dispatch(setFollowers({followers: resp.data}))
    });
}

function loadFollowing(dispatch, username) {
    axios.get("/api/user/following", { params: {username: username}}).then((resp) => {
        dispatch(setFollowing({following: resp.data}))
    });
}

function Feed(props) {
    const dispatch = useDispatch();
    if (props.user) {
    loadAllMessages(dispatch);
    loadStats(dispatch);
    loadFollowers(dispatch, props.user.username);
    loadFollowing(dispatch, props.user.username);
    }

    return (
        <div>
            <Statistics></Statistics>
            <div id={styles.commentsArea}>
                <NewMessage></NewMessage>
                <MessageList></MessageList>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        user: state.authentication.user
    }
}

export default connect(mapStateToProps)(Feed);
