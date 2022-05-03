import { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./feed.module.css";

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
                                this.props.message.date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'numeric', hour: 'numeric', minute: 'numeric' })
                            }
                        </div>
                        <Link to={"/user/" + this.props.message.author} className={styles.commentUsername}>@{this.props.message.author}</Link>
                        <button className={["regularButton", "secondaryButton"].join(" ")}>+</button>
                    </div>
                    <div className={styles.commentText}>{this.props.message.text}</div>
                </div>
            </div>
        );
    }
}

export { MessageComponent };