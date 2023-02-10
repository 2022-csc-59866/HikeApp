export default class Hike{
  // hike = {
  //   name: str,
  //   city: str,
  //   state: str,
  //   country: str,
  //   lat: double,
  //   lon: double,
  //   parent_id: double,
  //   place_id: double,
  //   description: str
  // }

  constructor(name, city, state, country, lat, lon, parent_id, place_id, description) {
    this.name = name;
    this.city = city;
    this.state = state;
    this.country = country;
    this.lat = lat;
    this.lon = lon;
    this.parent_id = parent_id;
    this.place_id = place_id;
    this.description = description;
  }

}