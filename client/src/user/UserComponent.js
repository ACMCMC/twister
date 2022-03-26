import { Component } from "react";
import styles from "./user.module.css";

class UserComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"generalContainer"}>
                <div className={"containerContent"}>
                    <h1>User info</h1>
                    <dl>
                        <dt>Name</dt>
                        <dd>{this.props.user.getName()}</dd>
                        <dt>Username</dt>
                        <dd className={styles.data}>@{this.props.user.getUser()}</dd>
                        <dt>Birthdate</dt>
                        <dd>
                            {
                                this.props.user.getBirthdate().toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'numeric' })
                            }
                        </dd>
                        <dt>Email</dt>
                        <dd><a href={"mailto:" + this.props.user.getEmail()}>{this.props.user.getEmail()}</a></dd>
                    </dl>
                </div>
            </div>
        );
    }
}

export { UserComponent };