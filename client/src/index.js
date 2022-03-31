import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './stylesheet.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Feed } from './feed/Feed';
import { Login } from './login/Login';
import { SignUp } from './sign_in/SignUp';
import { NavigationPannel } from './nav/NavigationPannel';
import { Footer } from './footer/Footer';
import { Session } from './Session';

const session = new Session();

ReactDOM.render(
  <BrowserRouter>
    <NavigationPannel session={session}></NavigationPannel>
    <Routes>
      <Route path="/" element={<Feed />} />
      <Route path="login" element={<Login />} />
      <Route path="sign_up" element={<SignUp />} />
    </Routes>
    <Footer></Footer>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
