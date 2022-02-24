import { Component } from "react";

class UserComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>{this.props.user.getUser()}</p>
                <p>{this.props.user.getName()}</p>
                <p>{this.props.user.getBirthdate()}</p>
                <p>{this.props.user.getEmail()}</p>
            </div>
        );
    }
}