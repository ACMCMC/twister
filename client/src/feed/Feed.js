import styles from "./feed.module.css";
import { Component } from "react";
import { Message } from "../common/Message";
import MessageList from "./MessageList";
import NewMessage from "./NewMessage";
import { Statistics } from "./Statistics";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addMessage } from "../features/messages/messagesSlice";

function loadAllMessages(dispatch) {
    axios.get("/api/message/all")
    .then(result => {
        for (let message of result.data) {
            const parsedMsg = new Message(message.text, message.author, new Date(message.created), message._id, message.liked_by)
            dispatch(addMessage({message: parsedMsg}));
        }
    })
    .catch(error => {console.error(error)});
}

export function Feed(props) {
    const dispatch = useDispatch();
    loadAllMessages(dispatch);

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

