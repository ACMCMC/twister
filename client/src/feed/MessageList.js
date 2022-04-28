import { Component } from "react";
import { MessageComponent } from "./MessageComponent";
import styles from "./feed.module.css";
import { connect } from "react-redux";

function MessageList(props) {
    let messages = [];
    for (let message of props.messages) {
        messages.push(<MessageComponent message={message}></MessageComponent>);
    }
    return (
        <div id={styles.commentsList}>
            {messages}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        messages: state.messages.messages
    };
}

export default connect(mapStateToProps)(MessageList);