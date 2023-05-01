export class User{

    user = {
        middleName: function(middleName) {this.middleName = middleName;},
        city : function (city) {this.city = city;},
        state : function (state) {this.state = state;},
        country : function (country) {this.country = country;}
    };

    constructor(firstName, lastName, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
  }

