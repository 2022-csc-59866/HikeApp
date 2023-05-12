export default class Hike_obj{
    // hike = {
    //   id: int,
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
  
    constructor(id, name, length, city, region, country, lat, lon, thumbnail, description) {
      this.id = id;
      this.name = name;
      this.miles = length;
      this.city = city;
      this.region = region;
      this.country = country;
      this.lat = lat;
      this.lon = lon;
      this.thumbnail = thumbnail;
      this.description = description;
    }
  }

