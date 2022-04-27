import axios from "axios";
import { Component } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/authentication/authenticationSlice";

async function request_logout(dispatch) {
    axios.post("/api/user/logout")
    .then((result) => dispatch(logout()))
    .catch((error) => alert(error));
}

export function Logout() {
    const dispatch = useDispatch();

    return <button class="regularButton" onClick={() => request_logout(dispatch)}>Logout</button>;
}
