import styles from './search.module.css';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { connect } from "react-redux";
import { useState, useEffect } from 'react';
import SearchResultComponent from './SearchResultComponent';

function performSearch(query, justMyContacts) {
    return axios.get('/api/search/', { params: { username: query, justMyContacts: justMyContacts} });
}

function SearchComponent(props) {
    const url = useLocation();
    const urlSearchParams = new URLSearchParams(url.search);
    const searchQuery = urlSearchParams.get('query');
    const justMyContacts = urlSearchParams.get('just-my-contacts') === 'on' ? true : false;

    useEffect(() => {
        performSearch(searchQuery, justMyContacts).then(result => {
            setResult(result.data);
        }).catch(error => {
            console.error(error);
        });
    }, []);

    const [results, setResult] = useState(null);

    const resultsComponents = results ? results.map(result => {
        return (
            <SearchResultComponent result={result} key={result.username} />
        );
    }) : null;

    if (!results) {
        return (
            <div id={styles.searchResultsArea}>
                <div id={styles.commentsList}>
                    <div className={"formHeader"}>
                        <h1>Search results</h1>
                    </div>
                    <div>
                        <div className={["generalContainer", styles.searchResultContainer].join(" ")}>
                            <div className={"containerContent"}>
                                <div className={styles.searchResult}>
                                    <p>Searching...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (results.length === 0) {
        return (
            <div id={styles.searchResultsArea}>
                <div id={styles.commentsList}>
                    <div className={"formHeader"}>
                        <h1>Search results</h1>
                    </div>
                    <div>
                        <div className={["generalContainer", styles.searchResultContainer].join(" ")}>
                            <div className={"containerContent"}>
                                <div className={styles.searchResult}>
                                    <p>No results.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div id={styles.searchResultsArea}>
                <div id={styles.commentsList}>
                    <div className={"formHeader"}>
                        <h1>Search results</h1>
                    </div>
                    <div>
                        {resultsComponents}
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchComponent;