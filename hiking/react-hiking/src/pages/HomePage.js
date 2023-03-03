import { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/HomePage.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// components
import { Hike } from "../components/Hike";

// utils
import {populateHikes} from "../utils/populateHikes";

export const HomePage = () => {

    const [ hikes, setHikes ] = useState([]);

    useEffect(() => {
        const handleHikeList = () => {
            const options = {
                //params are hardcoded
                method: 'GET',
                url: 'https://trailapi-trailapi.p.rapidapi.com/activity/',
                params: {
                    lat: '34.1',
                    limit: '25',
                    lon: '-105.2',
                    radius: '25',
                    'q-activities_activity_type_name_eq': 'hiking'
                },
                headers: {
                    'X-RapidAPI-Key': process.env.REACT_APP_TRAIL_API_KEY,
                    'X-RapidAPI-Host': process.env.REACT_APP_TRAIL_API_HOST
                }
                };
            const axios_request = axios.request(options);
        
            //populate list of hikes with values returned from the request
            axios_request.then(response => {
            // console.log("response data " + response.data + " typeof response " + typeof response.data);
            let hikeList = populateHikes(response.data);
            setHikes(hikeList);
            }).catch(error => {
                console.error(error);
            });
        }
        handleHikeList();
    }, [])

    return (
    <div className="home">
        <div className="container">
        {
            // index needed to iterate, each hike has its own internal uuid
            hikes.map((hike, index) => {
                return (
                <div className="card">
                    <Hike
                        hike={hike}
                    /> 
                </div>
                )
            })
        }
        </div>
    </div>

    )
}
