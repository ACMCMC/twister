import axios from "axios";
import { Component } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addMessage } from "../features/messages/messagesSlice";
import styles from "./feed.module.css";
import { loadStats } from "./Statistics";

function like(dispatch, _id) {
    axios.put("/api/message/like", { _id: _id }).then((resp) => {
        dispatch(addMessage({ message: resp.data }));
        loadStats(dispatch);
    });
}

function dislike(dispatch, _id) {
    axios.delete("/api/message/like", { params: { _id: _id } }).then((resp) => {
        dispatch(addMessage({ message: resp.data }));
        loadStats(dispatch);
    });
}

function signal(dispatch, _id) {
    axios.put("/api/message/signal", { _id: _id }).then((resp) => {
        dispatch(addMessage({ message: resp.data }));
        loadStats(dispatch);
    });
}

function MessageComponent(props) {
    const dispatch = useDispatch();
    const liked = props.message.liked_by.includes(props.user.username);
    const totalLikes = props.message.liked_by.length;
    const signalled = props.message.signalled_by.includes(props.user.username);
    const totalSignalled = props.message.signalled_by.length;

    if (totalSignalled <= 10) {
    return (
        <div className={["generalContainer", styles.commentContainer].join(" ")}>
            <div className={"containerContent"}>
                <div className={styles.commentInfoHeader}>
                    <div className={styles.commentCreationDate}>
                        {
                            props.message.created.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'numeric', hour: 'numeric', minute: 'numeric' })
                        }
                    </div>
                    <Link to={"/user/" + props.message.author} className={styles.commentUsername}>@{props.message.author}</Link>
                    <button className={["regularButton", "secondaryButton"].join(" ")} onClick={() => {
                        if (!liked) {
                            like(dispatch, props.message._id)
                        } else {
                            dislike(dispatch, props.message._id)
                        }
                    }}>{liked ? "❤️" : "🤍"} {totalLikes}</button>
                    <button className={["regularButton", "secondaryButton"].join(" ")} onClick={() => {
                        if (true) { // Allow repeated signals
                            signal(dispatch, props.message._id)
                        }
                    }}>{signalled ? "❗" : "❕"} {totalSignalled}</button>
                </div>
                <div className={styles.commentText}>{props.message.text}</div>
            </div>
        </div>
    ); }
    else {
        return (
        <div className={["generalContainer", styles.commentContainer].join(" ")}>
            <div className={"containerContent"}>
                <div className={styles.commentInfoHeader}>
                    <p>This message by <Link to={"/user/" + props.message.author} className={styles.commentUsername}>@{props.message.author}</Link> has {totalSignalled} signals, so it is not shown.</p>
                </div>
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

export default connect(mapStateToProps)(MessageComponent);