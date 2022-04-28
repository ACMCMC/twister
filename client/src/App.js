import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Feed } from './feed/Feed';
import { Login } from './login/Login';
import { SignUp } from './sign_up/SignUp';
import NavigationPannel from './nav/NavigationPannel';
import Footer from './footer/Footer';
import { useDispatch } from 'react-redux';
import { login, logout } from './features/authentication/authenticationSlice';
import axios from 'axios';
import { registerConnected, registerDisconnected } from './features/connection/connectionSlice';
import { UserComponent } from './user/UserComponent';
import ProfileComponent from './profile/ProfileComponent';

function App() {
    const dispatch = useDispatch();

    get_session_status().then(result => {
        dispatch(registerConnected()) // Regardless of the response, if we are here, we are connected to the server
        if (result.data.logged_in) {
            dispatch(login({ user: result.data.user }));
        } else {
            dispatch(logout());
        }
    }).catch((error) => {
        dispatch(registerDisconnected());
    });

    return (
        <BrowserRouter>
            <NavigationPannel></NavigationPannel>
            <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="login" element={<Login />} />
                <Route path="sign_up" element={<SignUp />} />
                <Route path="user" element={<UserComponent />} />
                <Route path="profile" element={<ProfileComponent />} />
            </Routes>
            <Footer></Footer>
        </BrowserRouter>
    );
}

function get_session_status() {
    return axios.get('/api/public/get_session_status');
}

export default App;
