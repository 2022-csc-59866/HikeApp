import Album_obj from "./Album_obj";

  //get an album with all data from users_album table and album_hikes table
  export async function populateUserAlbum ({albumInfo}){
    // async request to get all info in an album
    // albumInfo contains the
    // album_id, album_name, user_id, album_type

    //create a hike js object
    const album = new Album_obj(albumInfo.album_id, albumInfo.album_name, [], albumInfo.user_id, albumInfo.album_type);
    return album;
  }
