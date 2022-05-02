import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/authentication/authenticationSlice";

async function request_logout(dispatch, navigate) {
    axios.post("/api/user/logout")
    .then((result) => {dispatch(logout()); navigate("/");})
    .catch((error) => alert(error));
}

export function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return <button className="regularButton" onClick={() => request_logout(dispatch, navigate)}>Logout</button>;
}
