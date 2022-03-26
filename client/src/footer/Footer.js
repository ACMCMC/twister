import { Component } from "react";
import styles from "./footer.module.css";
const axios = require('axios').default;

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: false,
        }
    }

    render() {
        return <footer>
            <p>
                Connection to the server: {this.state.isConnected ? "connected" : "disconnected"}
            </p>
        </footer>
    }

    componentDidMount() {
        this.isConnected();
    }

    isConnected() {
        axios.get('/api/isConnected')
            .then(function (response) {
                this.setState({isConnected: response.data.isConnected});
            }.bind(this))
            .catch(function (error) {
                this.setState({isConnected: false});
            }.bind(this));
    }
}

export { Footer };
