import { Component } from "react";
import { MessageComponent } from "./MessageComponent";
import styles from "./feed.module.css";
import { connect } from "react-redux";

function MessageList(props) {
    let messages = [];
    for (let message of props.messages) {
        if (!message.parent)
            messages.push(<MessageComponent message={message} key={message._id}></MessageComponent>);
    }
    return (
        <div id={styles.commentsList}>
            {messages}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        messages: Object.values(state.messages.messages)
    };
}

export default connect(mapStateToProps)(MessageList);