import { Component } from "react";
import { Logout } from "./Logout";
import { Login } from "./login/Login";
import { SignIn } from "./sign_in/SignIn";

class NavigationPannel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isConnected) {
            return (
                <nav className="NavigationPannel">
                    <Logout logout={this.props.logout}></Logout>
                </nav>
            );
        } else {
            return (
                <nav className="NavigationPannel">
                    <Login></Login>
                </nav>
            );
        }
    }
}

export { NavigationPannel };