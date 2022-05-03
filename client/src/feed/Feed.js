import styles from "./feed.module.css";
import { Component } from "react";
import MessageList from "./MessageList";
import NewMessage from "./NewMessage";
import Statistics from "./Statistics";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addMessage } from "../features/messages/messagesSlice";
import {loadStats} from "./Statistics";

function loadAllMessages(dispatch) {
    axios.get("/api/message/all")
        .then(result => {
            for (let message of result.data) {
                message.date = new Date(message.created);
                dispatch(addMessage({ message: message }));
            }
        })
        .catch(error => { console.error(error) });
}

export function Feed(props) {
    const dispatch = useDispatch();
    loadAllMessages(dispatch);
    loadStats(dispatch);

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

