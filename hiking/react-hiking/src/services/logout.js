import axios from 'axios';

export function logout() {

    function logoutUser() {
        axios({
            method: "POST",
            url: "/auth/logout",
        })
        .then((response) => {
            const res =response.data;
            console.log(res);
                          
            //remove cookie
            localStorage.removeItem('session_cookie_name');
            window.location.href = `http://localhost:3000/`;  
        }).catch((error) => {
            console.log(error.response);
            alert("The backend made an oopsy... Something went wrong");
            //refresh page
            window.location.href = "http://localhost:3000/bye";  
    })}

    logoutUser();            
}