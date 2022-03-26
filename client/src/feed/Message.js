import { Component } from "react";
import styles from "./feed.module.css";

class Message {
    constructor(text, user, date) {
        this.text = text;
        this.user = user;
        this.date = date;
    }

    getText() {
        return this.text;
    }

    getUser() {
        return this.user;
    }

    getDate() {
        return this.date;
    }
}

class MessageComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={["generalContainer", styles.commentContainer].join(" ")}>
                <div className={"containerContent"}>
                    <div className={styles.commentInfoHeader}>
                        <div className={styles.commentCreationDate}>
                            {
                                this.props.message.getDate().toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'numeric' })
                            }
                        </div>
                        <div className={styles.commentUsername}>@{this.props.message.getUser()}</div>
                        <button className={["regularButton", "secondaryButton"].join(" ")}>+</button>
                    </div>
                    <div className={styles.commentText}>{this.props.message.getText()}</div>
                </div>
            </div>
        );
    }
}

export { MessageComponent, Message };