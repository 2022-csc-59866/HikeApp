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
            {/* TODO: Profile info is hardcoded, get it from db */}
            {
                <div className="card">
                    <Profile
                        name={"John"}
                        bio={"I like hiking"}
                        avatarUrl={"https://cdn-icons-png.flaticon.com/512/5556/5556468.png"}
                        completedHikesCount={10}
                    /> 
                </div>
            }
                <button type="submit">Log Out</button>
            </form>
        </div>
    )
}