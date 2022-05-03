import axios from "axios";
import { Component, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { addMessage } from "../features/messages/messagesSlice";
import styles from "./feed.module.css";

function post_tweet(dispatch, textRef) {
    axios.post("/api/message/", {
        text: textRef.current.value
    })
        .then(result => {
            const message = result.data;
            dispatch(addMessage({ message: message }));
            textRef.current.value = "";
        })
        .catch(error => { alert(error) });
}

function NewMessage(props) {
    const textRef = useRef();
    const dispatch = useDispatch();
    if (!props.user) {
        return (
            <div id={styles.newCommentContainer} className={"generalContainer"}>
                <div className={"formHeader"}>
                    <h1>Add new Tweet</h1>
                </div>
                <div className={"containerContent"}>
                    <div className={styles.field}>
                        You need to be logged in to post a tweet.
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div id={styles.newCommentContainer} className={"generalContainer"}>
                <div className={"formHeader"}>
                    <h1>Add new Tweet</h1>
                </div>
                <div className={"containerContent"}>
                    <form id={styles.newCommentContainer}>
                        <textarea id={styles.newCommentText} className={styles.newCommentText} ref={textRef}></textarea>
                        <button type="button" className={["regularButton", "primaryButton"].join(" ")} id={styles.submitNewCommentButton} onClick={() => post_tweet(dispatch, textRef)}>Add</button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authentication.user
    };
}

export default connect(mapStateToProps)(NewMessage);