import Hike_obj from "./Hike_obj";

  //get a list of hikes and return a hike object
  export function populateHikes (body){

    let hikesList = [];

    for (let element_i in body.data) {
      const hike_preprocess = body.data[element_i];

      if (hike_preprocess.lon == 0 || hike_preprocess.lat == 0) {
        continue;
      }
      
      //create a hike js object
      const hike = new Hike_obj(hike_preprocess.id, hike_preprocess.name, hike_preprocess["length"], 
                            hike_preprocess.city, 
                            hike_preprocess.region, hike_preprocess.country, hike_preprocess.lat, hike_preprocess.lon,
                            hike_preprocess.thumbnail,
                            hike_preprocess.description);
      hikesList.push(hike);
    }
    return hikesList;
  }