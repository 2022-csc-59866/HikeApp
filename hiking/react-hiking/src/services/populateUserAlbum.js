import Album_obj from "./Album_obj";
import { getHikesInAlbum} from './getHikesInAlbum';

  //get an album with all data from users_album table and album_hikes table
  export async function populateUserAlbum ({albumInfo}){
    //async request to get all hikes in an album
    //albumInfo contains the
    // album_id, album_name, user_id, album_type

    //async call to GET "/album_hikes/get_all"
    //lookup hikes by album_id
    const hikesInAlbum = await getHikesInAlbum(albumInfo.album_id);

    //create a hike js object
    const album = new Album_obj(albumInfo.album_id, albumInfo.album_name, hikesInAlbum, albumInfo.user_id, albumInfo.album_type);
    return album;
  }
