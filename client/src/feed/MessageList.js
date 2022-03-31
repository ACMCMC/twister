import { Component } from "react";
import { MessageComponent } from "./MessageComponent";
import styles from "./feed.module.css";

class MessageList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let messages = []
        for (let message of this.props.messages) {
            messages.push(<MessageComponent message={message}></MessageComponent>);
        }
        return (
            <div id={styles.commentsList}>
                {messages}
            </div>
        );
    }
}

export { MessageList };