import { Link } from "react-router-dom";
import styles from "./feed.module.css";

export default function StatisticsUserLinkComponent(props) {
    return (
        <Link className={styles.statisticsUserLinkContainer} to={"/user/" + props.id}>@{props.id}</Link>
    )
}