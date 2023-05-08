import { useState, useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { IconButton} from 'rsuite';
import StarIcon from '@rsuite/icons/legacy/Star';

// components
import { Hike } from "../components/Hike";
import { handleHikeList } from '../../services/handleHikeList';
import  AlbumsModal from "../components/AlbumsModal";
import { useNavigate } from "react-router";



//hikesList is a list of hike results passed from search results
//route is Title -> App -> Body -> HomePage
export function HomePage({hikesList}) {
    const [openModal, setOpenModal] = useState(false);
    const [hikesLoad, setHikesLoad] = useState([]); 
    const navigate = useNavigate();

    //check if there is a cookie for the user
    const isAuthenticated = localStorage.getItem('session_cookie_name');

    function addToAlbum() {
        //user is authenticated -> open modal
        if (isAuthenticated) {
            setOpenModal(true);
        } else { //user is not authenticated, there is no session, navigate to login
            navigate("/hi");
        }
    }

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
                    <div>
                    {/* Modal per hike */}
                    <div className="Star">
                        <right><IconButton size='lg' icon={<StarIcon />}
                        onClick={addToAlbum} 
                        className='modalButton'>
                        </IconButton></right>
                    </div>
                    <AlbumsModal 
                    open={openModal} 
                    onClose={() => setOpenModal(false)} />
                    </div>
                </div>
                )
            })
        }
        </div>
    </div>
    )
}
