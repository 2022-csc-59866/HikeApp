import React, { useState } from "react";
import './LocalAuthenticate.css';

//pages
import { Login } from "../Login/Login";
import { Register } from "../RegisterPage/Register";

function LocalAuthenticate() {
  const [currentForm, setCurrentForm] = useState('login');
  
  const clientID = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
  <div className="auth-container">
    <div className="local-authenticate">

      {
        currentForm === "login" ? 
                        <Login onFormSwitch={toggleForm} /> : 
                        <Register onFormSwitch={toggleForm} />
      }
        <div className="login-buttons">                  
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
    </div>
  </div>
  );
  }

export default LocalAuthenticate;