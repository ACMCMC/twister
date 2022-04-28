import { connect } from "react-redux";
import styles from "./footer.module.css";

function Footer(props) {
    return <footer id={styles.footer}>
        <p>
            Connection to the server: {props.isConnected ? "connected" : "disconnected"}
        </p>
    </footer>
}

function mapStateToProps(state) {
    return {
        isConnected: state.connection.isConnected
    }
}

export default connect(mapStateToProps)(Footer);