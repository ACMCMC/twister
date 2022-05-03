import axios from "axios";
import { Component } from "react";
import { connect, useDispatch } from "react-redux";
import { setStatistics } from "../features/statistics/statisticsSlice";
import styles from "./feed.module.css";

function loadStats(dispatch) {
    return axios.get("/api/statistics").then((resp) => dispatch(setStatistics({statistics: resp.data})));
}

function Statistics(props) {

        if (props.stats) {
        return (
            <div className="generalContainer" id={styles.statisticsContainer}>
                <div className="formHeader">
                    <h1>Statistics</h1>
                    </div>
                <div className="containerContent">
                    Likes: {props.stats.likes}
                </div>
            </div>
        );} else {
        return (
            <div className="generalContainer" id={styles.statisticsContainer}>
                <div className="formHeader">
                    <h1>Statistics</h1>
                    </div>
                <div className="containerContent">
                    Not available
                </div>
            </div>
        );
        }
    }

    function mapStateToProps(state) {
        return {
            stats: state.statistics.statistics
        };
    }

export default connect(mapStateToProps)(Statistics);

export {loadStats};