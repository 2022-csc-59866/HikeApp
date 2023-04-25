import axios from 'axios';
import React, { useState } from "react";

export function FlaskGetHookUp() {
    //how to connect to flask
    const [hikeData, setHikeData] = useState(null)
    function getData() {
        axios({
        method: "GET",
        url:"/search",
        })
        .then((response) => {
            const res =response.data;
            console.log(res);
            setHikeData(({
                hike_name: res[0].name,
                description: res[0].description}))
        }).catch((error) => {
        if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    })}
    console.log(hikeData);
    return (<div>
            <p>To get hike details: </p><button onClick={getData}>Click me</button>
            {hikeData && <div>
                <p>Hike name: {hikeData.hike_name}</p>
                <p>Description: {hikeData.description}</p>
                </div>
            }
        </div>
    );
    
  }