import { Component } from "react";
import styles from "./feed.module.css";

class NewMessage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id={styles.newCommentContainer} className={"generalContainer"}>
                <div className={"formHeader"}>
                    <h1>Ajouter nouveau commentaire</h1>
                </div>
                <div className={"containerContent"}>
                    <form>
                        <textarea id={styles.newCommentText} className={styles.newCommentText}></textarea>
                        <button className={["regularButton", "primaryButton"].join(" ")} id={styles.submitNewCommentButton}>Ajouter</button>
                    </form>
                </div>
            </div>
        );
    }
}

export { NewMessage };