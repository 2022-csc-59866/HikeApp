export class User{

    user = {
        middleName: function(middleName) {this.middleName = middleName;},
        city : function (city) {this.city = city;},
        state : function (state) {this.state = state;},
        country : function (country) {this.country = country;},
        cookie : function (cookie) {this.cookie = cookie;},
        avatar : function (avatarUrl) {this.avatarUrl = avatarUrl},
        albums : function (albumList) {this.albums = albumList;}
    };

    constructor(firstName, lastName, email, password, cookie, avatarUrl, albumList=[]) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.cookie = cookie;
        this.avatarUrl = avatarUrl;
        this.albums = albumList;
    }
  }

