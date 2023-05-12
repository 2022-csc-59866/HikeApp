import React, { useState } from "react";

//functions
import { login } from "../../services/login";

export const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const clientID = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;

    const handleSubmit = (e) => {
        e.preventDefault();
        login({email, password});
    }

    return (
    <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <div className="login-buttons">
                    <button type="submit">Log In</button>
                    <div id="g_id_onload"
                        data-client_id={clientID}
                        data-context="signin"
                        data-ux_mode="popup"
                        data-login_uri="http://localhost:3000/hi"
                        data-auto_prompt="false">
                    </div>

                    <div className="g_id_signin"
                        data-type="standard"
                        data-shape="pill"
                        data-theme="outline"
                        data-text="signin_with"
                        data-size="large"
                        data-logo_alignment="left">
                    </div>
                </div>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
    </div>

    )
}