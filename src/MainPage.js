import React from "react";
import {NavigationPannel} from "./NavigationPannel";
import "./stylesheet.css";
import {SignIn} from "./sign_in/SignIn";

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'sign_in',
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
        var output = [<NavigationPannel login={this.getConnected} logout={this.setLogout} isConnected={this.state.isConnected}
        />]

        if (this.state.currentPage === 'sign_in') {
            output.push(<SignIn/>)
        }

        return output;
    }
}

export { MainPage };