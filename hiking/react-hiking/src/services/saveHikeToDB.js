import axios from 'axios';

export function saveHikeToDB(hike) {
    function saveHikeToHikeTable(hike) {
        axios({
            method: "POST",
            url: "/hike/save_hike",
            data: {
                "api_id": hike.apiId,
                "id": hike.id,
                "name": hike.name,
                "length": hike.miles,
                "latitude": hike.lat,
                "longitude" : hike.lon,
                "city" : hike.city,
                "state" : hike.state,
                "country" : hike.country,
                "description": hike.description,
                "thumbnail" : hike.thumbnail
            }
        })
        .then((response) => {
            const res =response.data;
            console.log(res);
            //redirect to user page
        }).catch((error) => {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
    })}

    saveHikeToHikeTable(hike);
}