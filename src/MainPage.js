import React from "react";
import {NavigationPannel} from "./NavigationPannel";

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'connection',
            isConnected: false
        };
        this.getConnected = this.getConnected.bind(this); // Bind the method to the class
        this.setLogout = this.setLogout.bind(this); // Bind the method to the class
    }

    getConnected() {
        this.setState({
            currentPage: 'feed',
            loggedIn: true
        })
    }

    setLogout() {
        this.setState({
            currentPage: 'connection',
            isConnected: false
        })
    }

    render() {
        return ( <NavigationPannel login={this.getConnected} logout={this.setLogout} isConnected={this.state.isConnected}/> );
    }
}

export { MainPage };