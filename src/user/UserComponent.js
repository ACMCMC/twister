import { Component } from "react";

class UserComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>user info:</p>
                <p>{this.props.user.getUser()}</p>
                <p>{this.props.user.getName()}</p>
                <p>
                    {
                        this.props.user.getBirthdate().toLocaleDateString('en-EN', { weekday: 'short', day: 'numeric', month: 'numeric', year: 'numeric'})
                    }
                </p>
                <p>{this.props.user.getEmail()}</p>
            </div>
        );
    }
}

export { UserComponent };
