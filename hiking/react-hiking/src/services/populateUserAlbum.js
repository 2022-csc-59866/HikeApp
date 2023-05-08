import Album_obj from "./Album_obj";
import { getHikesInAlbum} from './getHikesInAlbum';

  //get a list of albums
  export async function  populateUserAlbum ({albumInfo}){
    //async request to get all hikes in an album
    //albumInfo contains the
    // id
    // name
    // hike_list
    // user_id
    // album_type
    const hikesInAlbum = await getHikesInAlbum(albumInfo["id"]);

    //create a hike js object
    const album = new Album_obj(albumInfo.id, albumInfo.name, hikesInAlbum, albumInfo.user_id, albumInfo.album_type);
    return album;
  }
