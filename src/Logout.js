import { Component } from "react";

class Logout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div>
            Logout
            <button onClick={this.props.logout}>Logout</button>
        </div>);
    }
}

export {Logout};