import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './stylesheet.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Feed } from './feed/Feed';
import { Login } from './login/Login';
import { SignUp } from './sign_up/SignUp';
import { NavigationPannel } from './nav/NavigationPannel';
import { Footer } from './footer/Footer';
import store from './store'
import { Provider, useDispatch } from 'react-redux';
import { login, logout } from './features/authentication/authenticationSlice';
import axios from 'axios';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <NavigationPannel></NavigationPannel>
            <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="login" element={<Login />} />
                <Route path="sign_up" element={<SignUp />} />
            </Routes>
            <Footer></Footer>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

function get_session_status() {
    return axios.get('/api/user/get_session_status').catch(error => { console.error(error) });
}

get_session_status().then(result => {
    if (result.data) {
        alert("Vous êtes déjà connecté");
        useDispatch(login());
    } else {
        useDispatch(logout());
    }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
