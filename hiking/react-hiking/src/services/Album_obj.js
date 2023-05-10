import {v4 as uuidv4} from 'uuid';

export default class Album_obj{
    // album = {
    //   id: automatically generated uuid,
    //   name: str,
    //   hike_list: list of hike_ids,
    //   album_type: str
    // }
  
    constructor(album_id, album_name, user_id, album_type, hike_list) {
     
      this.album_id = album_id;
      this.album_name = album_name;
      this.user_id = user_id;
      if (hike_list === undefined || hike_list.length === 0) {
        this.hike_list = [];
      } else {
        this.hike_list = hike_list;
      }
      this.album_type = album_type;
    }
  }

