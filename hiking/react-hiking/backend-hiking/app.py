# python -m flask run --host=0.0.0.0
from flask import Flask, jsonify
import psycopg2
from decouple import config
from flask import Flask, request
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker 
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base
from models.hike_model import Hike
from models.album_hikes_model import Album_Hikes
from models.album_type import AlbumType
from models.transit_type import TransitType
from models.transit_model import Transit
from models.users_model import User
from models.user_albums_model import User_Albums
from serialize_util import serialize_sqlalchemy_objects_to_dictionary

USERNAME_PSQL = config('USERNAME_PSQL', default='')
PASSWORD_PSQL = config('PASSWORD_PSQL', default='')
DB_NAME_PSQL = config('DB_NAME_PSQL', default='')
DB_PORT_PSQL = config('DB_PORT_PSQL', default='')
DB_HOST_PSQL = config('DB_HOST_PSQL', default='')
   
# #create application
app = Flask(__name__)

#establish a connection
engine = create_engine('postgresql+psycopg2://{}:{}@{}/{}'.format(USERNAME_PSQL, PASSWORD_PSQL, 
                                                                  DB_HOST_PSQL, DB_NAME_PSQL))
#start a session
Session = sessionmaker(bind=engine)
session = Session()

# # Write queries here
# new_hike = Hike(name="Nw Test", description="TEST TEST HIKE HIKE HIKE",
                # city="NYC", country="USA", latitude=-0.235, longitude=-0.1231422)

# session.add(new_hike)
# new_transit = Transit(user_id="1", transit_type=TransitType.BIKE)
# session.add(new_transit)
# new_album_hikes = Album_Hikes(album_id="1", hike_name="test", hike_longitude=0.3, hike_latitude=0.0)
# session.add(new_album_hikes)
# new_user_albums = User_Albums(user_id="10", album_id="2", album_name="NYC", album_type=AlbumType.CUSTOM)
# session.add(new_user_albums)
# new_user = User(user_id="4", first_name="John", last_name="Johnson", username="john-john2",country="USA")
# session.add(new_user)
# #commit changes
session.commit()

# test get route
@app.route("/search", methods=["GET"])
def search():
    limit = 10
    if limit in request.args:
        limit = request.args["limit"]

    hikes = session.query(Hike).limit(limit).all()
    return jsonify(serialize_sqlalchemy_objects_to_dictionary(hikes))

#close session
session.close()


if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)