import axios from "axios";
import { Component } from "react";
import { connect, useDispatch } from "react-redux";
import { setLikes } from "../features/statistics/statisticsSlice";
import styles from "./feed.module.css";
import StatisticsUserLinkComponent from "./StatisticsUserLinkComponent";

function loadStats(dispatch) {
    return axios.get("/api/statistics").then((resp) => dispatch(setLikes({ likes: resp.data.likes })));
}

function Statistics(props) {
    if (props.user) {
        const followersComponents = props.followers.map((follower) => <StatisticsUserLinkComponent key={follower} id={follower}/>);
        const followingComponents = props.following.map((follower) => <StatisticsUserLinkComponent key={follower} id={follower}/>);
        return (
            <div className="generalContainer" id={styles.statisticsContainer}>
                <div className="formHeader">
                    <h1>Statistics</h1>
                </div>
                <div className="containerContent">
                    <dl>
                        <dt>Likes:</dt>
                        <dd>{props.likes}</dd>
                        <dt>Followers:</dt>
                        <dd>{followersComponents}</dd>
                        <dt>Following:</dt>
                        <dd>{followingComponents}</dd>
                    </dl>
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