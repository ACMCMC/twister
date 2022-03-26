import React from "react";
import {NavigationPannel} from "./nav/NavigationPannel";
import {SignIn} from "./sign_in/SignIn";
import { Feed } from "./feed/Feed";
import {UserComponent} from "./user/UserComponent";
import {User} from "./common/User";
import {Footer} from "./footer/Footer"

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'user',
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
        if (this.state.currentPage === 'user') {
            let user = new User("Aldán CREO MARINO", "aldan.creo_marino", new Date(), "aldan.creo_marino@etu.sorbonne-universite.fr");
            output.push(<UserComponent user={user}/>)
        }
        if (this.state.currentPage === 'feed') {
            output.push(<Feed/>)
        }
        output.push(<Footer/>)

        return output;
    }
}

export { MainPage };