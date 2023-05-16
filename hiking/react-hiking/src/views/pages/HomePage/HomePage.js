import { useState, useEffect } from "react";
import './HomePage.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';

//routing
import { useNavigate } from "react-router";

//buttons
import { IconButton} from 'rsuite';
import StarIcon from '@rsuite/icons/legacy/Star';

// components
import { Hike } from "../../components/Hike/Hike";
import { handleHikeList } from '../../../services/handleHikeList';
import  AlbumsModal from "../../components/AlbumsModal/AlbumsModal";
import Loading from '../../components/Loading/Loading';

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

        async function getHikesAlabama() {
            const alabamaLat = 32;
            const alabamaLon = -86;
            let hikesAlabama = await handleHikeList(alabamaLat, alabamaLon);
            return hikesAlabama;
        }
    
        const createHikesMap = async () => {
            let hikesMap;
            
            if (hikesList.length === 0) {
                hikesMap = await getHikesAlabama();
            } else {
                hikesMap = hikesList;
            }
            setHikesLoad(hikesMap);
        };
    
        createHikesMap();
    
        if (hikesLoad === undefined) {
            return null;
        }

    }, [hikesList]);
        

    if (hikesLoad === undefined || hikesLoad.length === 0) {
        return (<div className="card"><Loading className="home-loading-component" Loading/></div>); 
        // Return null or a loading indicator while hikesLoad is undefined or empty
      }
      
    return (
    <div className="home">
        <div className="container">
        {
            // index needed to iterate, each hike has its own internal uuid
            hikesLoad.map((hike, index) => {
                return (
                <div className="card" key={index}>
                    <Hike
                        hike={hike}
                    /> 
                    <div>
                    {/* Modal per hike */}
                    <div className="Star">
                        <IconButton size='lg' icon={<StarIcon />}
                        onClick={addToAlbum} 
                        className='modalButton'>
                        </IconButton>
                    </div>
                    <AlbumsModal 
                    hike = {hike}
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
