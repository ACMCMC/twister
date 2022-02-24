import { Component } from "react";
import styles from "./feed.module.css";

class Statistics extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id={styles.statisticsContainer}>
                Statistics
            </div>
        );
    }
}

export { Statistics };