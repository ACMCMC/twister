import { Link } from 'react-router-dom';
import styles from './search.module.css';

function SearchResultComponent(props) {
    return (
        <div className={["generalContainer", styles.searchResultContainer].join(" ")}>
            <div className={"containerContent"}>
                <div className={styles.searchResult}>
                    <Link to={"/user/" + props.result.username} className={styles.searchResultUsername}>@{props.result.username}</Link>
                    <p className={styles.searchResultProfileName}>{props.result.name} {props.result.surname}</p>
                </div>
            </div>
        </div>
    );
}

export default SearchResultComponent;