import React, { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";
import './LocalAuthenticate.css';

function LocalAuthenticate() {
  const [currentForm, setCurrentForm] = useState('login');

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
    </div>
  </div>
  );
  }

export default LocalAuthenticate;