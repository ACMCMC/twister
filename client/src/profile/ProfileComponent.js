import { connect } from "react-redux";

function ProfileComponent(props) {
    if (props.user) {
        console.log(props.user);
    return <div>
<p>{props.user.name}</p>
<p>{props.user.surname}</p>
<p>{props.user.birthdate}</p>
<p>{props.user.email}</p>
        </div>
    }
else {return (<div></div>);}
}

function mapStateToProps(state) {
  return {
    user: state.authentication.user
  };
}

export default connect(mapStateToProps)(ProfileComponent);