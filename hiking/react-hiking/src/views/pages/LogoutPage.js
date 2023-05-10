import React from "react";

//functions
import { logout } from "../../services/logout";
import { Profile } from "../components/Profile";

export const LogoutPage = () => {;

    const handleSubmit = (e) => {
        e.preventDefault();
        logout();
    }

    return (
        <div className="auth-form-container">
            <h2>Logout</h2>
            <form className="logout-form" onSubmit={handleSubmit}>
            {
                <div className="card">
                    <Profile
                        bio={"I like hiking"}
                        completedHikes={10}
                    /> 
                </div>
            }
                <button type="submit">Log Out</button>
            </form>
        </div>
    )
}