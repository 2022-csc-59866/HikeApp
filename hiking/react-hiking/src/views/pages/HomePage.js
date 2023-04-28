import { useState, useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// components
import { Hike } from "../components/Hike";
import { handleHikeList } from '../../services/handleHikeList';

//hikesList is a list of hike results passed from search results
//route is Title -> App -> Body -> HomePage
export function HomePage({hikesList}) {

    const [hikesLoad, setHikesLoad] = useState([]); 

    useEffect(() => {
        //always load hikes in Alabama 
        async function getHikesAlabama () {
            const alabamaLon = 32;
            const alabamaLat = -86;
            let hikesAlabama = await handleHikeList(alabamaLon, alabamaLat);
            return hikesAlabama;
        }

        const createHikesMap = async () => {
            const hikesAlabama = await getHikesAlabama();
            const hikesMap = hikesAlabama === null ? hikesList : hikesAlabama;
            setHikesLoad(hikesMap);
          }

        createHikesMap();

        if (hikesLoad === undefined) {
            return null;
          }

    }, [hikesList]); // whats needed in useEffect
        

    return (
    <div className="home">
        <div className="container">
        {
            // index needed to iterate, each hike has its own internal uuid
            hikesLoad.map((hike, index) => {
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
