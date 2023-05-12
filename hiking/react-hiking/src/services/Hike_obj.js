import {v4 as uuidv4} from 'uuid';

export default class Hike_obj{
    // hike = {
    //   apiId: int,
    //   id: str (internal)
    //   name: str,
    //   length: str,
    //   city: str,
    //   region: str,
    //   country: str,
    //   lat: int,
    //   lon: int,
    //   thumbnail: str,
    //   description: str
    // }
  
    constructor(apiId, name, length, city, region, country, lat, lon, thumbnail, description) {
      this.id = uuidv4();
      this.name = name;
      this.miles = length;
      this.city = city;
      this.state = region;
      this.country = country;
      this.lat = lat;
      this.lon = lon;
      this.thumbnail = thumbnail;
      this.description = description;
      this.apiId = apiId;
    }
  }

