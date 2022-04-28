import { connect } from "react-redux";

function ProfileComponent(props) {
    return <p>ProfileComponent</p>
}

function mapStateToProps(state) {
  return {
    user: state.authentication.user
  };
}

export default connect(mapStateToProps)(ProfileComponent);