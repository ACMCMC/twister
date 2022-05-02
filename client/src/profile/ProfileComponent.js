import { connect } from "react-redux";
import styles from "./profile_component.module.css";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../features/authentication/authenticationSlice";

function request_user_update(dispatch, emailRef, passwordRef, nameRef, surnameRef, birthdateRef) {
  const user = {};
  if (emailRef.current.value !== "") {
    user.email = emailRef.current.value;
  }
  if (passwordRef.current.value !== "") {
    user.password = passwordRef.current.value;
  }
  if (nameRef.current.value !== "") {
    user.name = nameRef.current.value;
  }
  if (surnameRef.current.value !== "") {
    user.surname = surnameRef.current.value;
  }
  if (birthdateRef.current.value !== "") {
    user.birthdate = birthdateRef.current.value;
  }
  axios.put("/api/user/", user).then(response => {
    dispatch(login({
      user: response.data
    }));
  });
}

function ProfileComponent(props) {
  const dispatch = useDispatch();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordRewriteRef = useRef();
  const nameRef = useRef();
  const surnameRef = useRef();
  const birthdateRef = useRef();

  if (props.user) {
    console.log(props.user);

    return (
      <div id={styles.formAlignmentContainer}>
        <div id={styles.signUpForm} className="ContainerContent">
          <div className="formHeader">
            <h1>My profile</h1>
          </div>
          <div className="containerContent">
            <form>
              <div className={styles.field}>
                <label>Username
                </label>
                <input type="text" id={styles.login} name="username" ref={usernameRef} disabled="true" value={props.user.username} />
              </div>
              <div id={styles.rowNomPrenom} className={styles.field}>
                <div className={styles.verticalDiv}>
                  <label>Name
                  </label>
                  <input id={styles.prenom} name="prenom" type="text" ref={nameRef} defaultValue={props.user.name} />
                </div>
                <div className={styles.verticalDiv}>
                  <label>Surname
                  </label>
                  <input id={styles.nom} name="nom" type="text" ref={surnameRef} defaultValue={props.user.surname} />
                </div>
              </div>
              <div className={styles.field}>
                <label>Email
                </label>
                <input type="email" id={styles.login} name="email" ref={emailRef} defaultValue={props.user.email} />
              </div>
              <div className={styles.field}>
                <label>Birthdate
                </label>
                <input type="date" id={styles.login} name="birthdate" ref={birthdateRef} defaultValue={props.user.birthdate} />
              </div>
              <div className={styles.field}>
                <label>Password
                </label>
                <input type="password" id={styles.password} name="password" ref={passwordRef} />
              </div>
              <div className={styles.field}>
                <label for="passwordRewrite">Rewrite
                </label>
                <input type="password" id={styles.passwordRewrite} ref={passwordRewriteRef} name="passwordRewrite" />
              </div>
              <div id={styles.buttonsRow}>
                <button type="button" className="regularButton primaryButton" id={styles.btnConnexion} onClick={() => {
                  if (passwordRef.current.value === passwordRewriteRef.current.value) {
                    request_user_update(dispatch, emailRef, passwordRef, nameRef, surnameRef, birthdateRef);
                  } else {
                    alert("Les mots de passes ne correspondent pas");
                  }
                }}>Save</button>
                <Link to="/" className="regularButton secondaryButton">Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return (<div></div>);
  }
}

function mapStateToProps(state) {
  return {
    user: state.authentication.user
  };
}

export default connect(mapStateToProps)(ProfileComponent);