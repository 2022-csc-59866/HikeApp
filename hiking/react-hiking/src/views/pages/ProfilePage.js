import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// components
import { Profile } from "../components/Profile";
import { Album } from "../components/Album";

//images
import fav from "../../img/fav.svg"
import mountain from "../../img/mountain.svg"

import './ProfilePage.css';

export const ProfilePage = () => {

    return (
    <div className="home">
        <div class="container-fluid">
        {/* TODO: Profile info is hardcoded, get it from db */}
        {
            
            <div className="card">
                <Profile
                    name={"John"}
                    bio={"I like hiking"}
                    avatarUrl={"https://cdn-icons-png.flaticon.com/512/5556/5556468.png"}
                    completedHikesCount={10}
                /> 
            </div>
        }
        {   <div class="container-fluid">
            <div class="card-group">
                <div className="card">
                    <Album 
                        albumName={"Completed"}
                        albumId={1}
                        // TODO: pass name dynamically
                        userName={"John"}
                        coverUrl={mountain}
                        className="album-cover"
                    />
                </div>
                <div class="card">
                    <Album
                        albumName={"Favorite"}
                        // TODO: pass name dynamically
                        albumId={2}
                        userName={"John"}
                        coverUrl={fav}
                        className="album-cover"
                    />
                </div>
                {/* TODO: hook button to create new functionality */}
                <div class="card" >
                    <button className='add-album'>Create New Album</button>
                </div>
                {/* TODO: add more albums dynamically */}
            </div>
            </div>
        }
        </div>
    </div>
    )
}
