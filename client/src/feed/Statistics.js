import { Component } from "react";
import styles from "./feed.module.css";

class Statistics extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="generalContainer" id={styles.statisticsContainer}>
                <div className="formHeader">
                    <h1>Statistics</h1>
                    </div>
                <div className="containerContent">
                    FEFHEUR
                </div>
            </div>
        );
    }
}

export { Statistics };