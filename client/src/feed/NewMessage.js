import axios from "axios";
import { Component, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { Message } from "../common/Message";
import { addMessage } from "../features/messages/messagesSlice";
import styles from "./feed.module.css";

function post_tweet(dispatch, text) {
    axios.post("/api/message/", {
        text: text
    })
        .then(result => {
            const message = result.data;
            const parsedMsg = new Message(message.text, message.author, new Date(message.created), message._id, message.liked_by);
            dispatch(addMessage({ message: parsedMsg }));
        })
        .catch(error => { alert(error) });
}

function NewMessage(props) {
    const textRef = useRef();
    const dispatch = useDispatch();
    return (
        <div id={styles.newCommentContainer} className={"generalContainer"}>
            <div className={"formHeader"}>
                <h1>Add new Tweet</h1>
            </div>
            <div className={"containerContent"}>
                <div hidden={props.user !== null}>
                    <div className={styles.field}>
                        You need to be logged in to post a tweet.
                    </div>
                </div>
                <form hidden={props.user === null}>
                    <textarea id={styles.newCommentText} className={styles.newCommentText} ref={textRef}></textarea>
                    <button type="button" className={["regularButton", "primaryButton"].join(" ")} id={styles.submitNewCommentButton} onClick={() => post_tweet(dispatch, textRef.current.value)}>Add</button>
                </form>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        user: state.authentication.user
    };
}

export default connect(mapStateToProps)(NewMessage);