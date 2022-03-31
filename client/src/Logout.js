import { Component } from "react";
import { useDispatch } from "react-redux";
import { logout } from "./features/authentication/authenticationSlice";

export function Logout() {
    const dispatch = useDispatch();

    return <button onClick={() => dispatch(logout())}>Logout</button>;
}
