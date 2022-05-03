import axios from "axios";
import { Component } from "react";
import { connect, useDispatch } from "react-redux";
import { setLikes } from "../features/statistics/statisticsSlice";
import styles from "./feed.module.css";

function loadStats(dispatch) {
    return axios.get("/api/statistics").then((resp) => dispatch(setLikes({ likes: resp.data.likes })));
}

function Statistics(props) {
    if (props.user) {
        return (
            <div className="generalContainer" id={styles.statisticsContainer}>
                <div className="formHeader">
                    <h1>Statistics</h1>
                </div>
                <div className="containerContent">
                    <div>Likes: {props.likes}</div>
                    <div>Followers: {props.followers}</div>
                    <div>Following: {props.following}</div>
                </div>
            </div>
        );
    } else {
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
        likes: state.statistics.likes,
        followers: state.users.followers,
        following: state.users.following,
        user: state.authentication.user,
    };
}

export default connect(mapStateToProps)(Statistics);

export { loadStats };