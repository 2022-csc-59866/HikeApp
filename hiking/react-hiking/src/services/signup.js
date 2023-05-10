import { User } from './User';
import axios from 'axios';
import { v4 as uuid } from 'uuid';


export function signup({firstName, lastName, email, password, avatarUrl}) {

    function createUser(user) {
        axios({
            method: "POST",
            url: "/auth/signup",
            data: {
              "first_name": `${user.firstName}`,
              "last_name": `${user.lastName}`,
              "email": `${user.email}`,
              "password": `${user.password}`,
              "cookie": `${user.cookie}`,
              "avatar_url": `${user.avatarUrl}`
            }
        })
        .then((response) => {
            const res =response.data;
            console.log(res);
            localStorage.setItem('session_cookie_name', response.data["cookie"]);
            //redirect to user page
            //TODO: currently hardcoded
            window.location.href = `http://localhost:3000/profile/`;
        }).catch((error) => {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
            if (
                typeof error.response.data === "string" &&
                error.response.data.includes("duplicate key value violates unique constraint")
            ) {
                alert("User already exists.");
                // refresh page
                window.location.href = "http://localhost:3000/hi";
            } else {
                alert("The backend made an oopsy... Something went wrong");
                // refresh page
                window.location.href = "http://localhost:3000/hi";
            }
        })
    }

    console.log("signup function avatar === " + avatarUrl);
    if (firstName.length === 0 || lastName.length === 0 || email.length === 0 || password.length === 0){
        alert("All fields are required");
    } else {
        const session_cookie = uuid();
        const user = new User(firstName, lastName, email, password, session_cookie, avatarUrl);
        createUser(user);
    }
}