import styles from "./feed.module.css";
import { Component } from "react";
import { Message } from "./Message";
import { MessageList } from "./MessageList";
import { NewMessage } from "./NewMessage";
import { Statistics } from "./Statistics";

class Feed extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let messages = [
            new Message("abc", "John", new Date()),
            new Message("def", "Mark", new Date()),
            new Message("ghi", "Paul", new Date()),
            new Message("jkl", "Eric", new Date()),
        ];
        return (
            <div>
                <Statistics></Statistics>
                <div id={styles.commentsArea}>
                    <NewMessage></NewMessage>
                    <MessageList messages={messages}></MessageList>
                </div>
            </div>
        );
    }
}

export { Feed };
