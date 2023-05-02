import { User } from './User';
import axios from 'axios';

export function signup({firstName, lastName, email, password}) {

    function createUser(user) {
        axios({
            method: "POST",
            url: "/auth/signup",
            data: {
              "first_name": `${user.firstName}`,
              "last_name": `${user.lastName}`,
              "email": `${user.email}`,
              "password": `${user.password}`,
            }
        })
        .then((response) => {
            const res =response.data;
            console.log(res);
            //redirect to user page
            //TODO: currently hardcoded
            window.location.href = `http://localhost:3000/profile/${user.email}`;
        }).catch((error) => {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
            if (error.response.data.includes("duplicate key value violates unique constraint")) {
                alert("User already exists.");    
                //refresh page
                window.location.href = "http://localhost:3000/hi";
            } else {
                alert("The backend made an oopsy... Something went wrong");
                //refresh page
                window.location.href = "http://localhost:3000/hi";
            }
    })}

    if (firstName.length === 0 || lastName.length === 0 || email.length === 0 || password.length === 0){
        alert("All fields are required");
    } else {
        const user = new User(firstName, lastName, email, password);
        createUser(user);
    }
}