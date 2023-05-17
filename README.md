# HikeApp

HikeApp is a website that allows users to browse for bike trails near them. 

## Technologies used

### Frontend
The website is created using React. There are some bootstrap elements and the layout is using flex bootstrap grids.

### Backend
The backend is implemented in Python using Flask and SQLAlchemy. The server is Postgres and is hosted locally. 

### Services
- [x] Orginally used TrailAPI Find Bike Trails endpoint to batch load bike trails but migrated to using data stored in project instead since the third party API was not reliable.
- [x] Originally used TrailAPI Bike Trail Info endpoint to fetch specific bike trails when saved to an album but migrated to using data stored in project instead since the third party API was not reliable.
- [x] Google OAuth 2.0 is used to provide third-party authentication.
- [x] Google Embed Map API is used to load images for bike trails that do not have an image in TrailAPI data.
- [x] Google Maps API is used to load a map for the current user location as established by browser location when hike info is loaded.
- [x] Google Maps Directions API is used to provide walking, driving, biking, and transit directions between the user's current location and the selected bike trails location.

### Misc.
- [x] Project has continuous integration setup in GitHub for Node.js and Python workflows.
- [x] Project has React unit tests.
- [x] Project has Python unit tests.

## User Stories

- [x] Users can browse bike trails from the home page. 
- [x] Users can search for bike trails near them on the home page.
- [x] Users can sign up.
- [x] Users can login.
- [x] Users can logout.
- [x] Users can create albums from their Profile page.
- [x] Users can save trails they like in album folders from the home page. 
- [x] Users can browse bike trails they saved from their Profile page where they are redirected to an Album page.
- [x] Users can browse bike trails details either from the home page or from the album page.
- [x] Each bike trail displays some relevant information as well as directions.

NOTE: They can also use a Google account to sign up. However, since the website is hosted locally this functionality currently errors out. 

## User Stories Walkthroughs

- [x] Users can browse bike trails from the home page.

![Home Page](https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif](https://github.com/2022-csc-59866/HikeApp/blob/main/Hike-app-recordings/home-page.gif)

- [x] Users can search for bike trails near them on the home page.
![Home Page Search](https://github.com/2022-csc-59866/HikeApp/blob/main/Hike-app-recordings/home-page-search.gif)

- [x] Users can sign up.
![Signup](https://github.com/2022-csc-59866/HikeApp/blob/main/Hike-app-recordings/signup.gif)

- [x] Users can login.
![Login](https://github.com/2022-csc-59866/HikeApp/blob/main/Hike-app-recordings/signin.gif)

- [x] Users can logout.
![Logout](https://github.com/2022-csc-59866/HikeApp/blob/main/Hike-app-recordings/logout.gif)

- [x] Users can create albums from their Profile page.
![Create an Album](https://github.com/2022-csc-59866/HikeApp/blob/main/Hike-app-recordings/new-album.gif)

- [x] Users can save trails they like in album folders from the home page. 
- [x] Users can browse bike trails they saved from their Profile page where they are redirected to choose an Album page.
![Add Trails to Album & Browse Album](https://github.com/2022-csc-59866/HikeApp/blob/main/Hike-app-recordings/add-hikes.gif)

- [x] Users can browse bike trails details either from the home page or from the album page.
- [x] Each bike trail displays some relevant information as well as directions.
![Trail Page](https://github.com/2022-csc-59866/HikeApp/blob/main/Hike-app-recordings/hike-details.gif)

GIF created with [LiceCap](http://www.cockos.com/licecap/).
