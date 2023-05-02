import axios from 'axios';
import { v4 as uuid } from 'uuid';

export function login({email, password}) {

    function loginUser(email, password) {
        axios({
            method: "POST",
            url: "/auth/login",
            data: {
              "email": `${email}`,
              "password": `${password}`,
            }
        })
        .then((response) => {
            const res =response.data;
            console.log(res);
            // After successful login
            localStorage.setItem('session_cookie_name', uuid());
        }).catch((error) => {
            console.log(error.response);
            if (error.response.data.error.code === 401) {
                alert("Incorrect email or password.");
            } else {
                alert("The backend made an oopsy... Something went wrong");
                //refresh page
                window.location.href = "http://localhost:3000/hi";
            }  
    })}
  

    if (email.length === 0 || password.length === 0){
        alert("All fields are required");
    } else {
        const sessionToken = localStorage.getItem('session_cookie_name');
        if (sessionToken) {
            // User is already logged in, redirect to profile page
            window.location.href = `http://localhost:3000/profile`;
        } else {
            loginUser(email, password);
        }
    }
}