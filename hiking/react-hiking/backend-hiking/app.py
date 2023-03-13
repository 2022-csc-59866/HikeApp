# python -m flask run --host=0.0.0.0
from flask import Flask, jsonify
import psycopg2
from decouple import config
from flask import Flask, request
from sqlalchemy import create_engine, Column, String, Integer, DateTime, Float
from sqlalchemy.orm import sessionmaker #, relationship, backref
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base
from models.hike_model import Hike
from serialize_util import serialize_sqlalchemy_objects_to_dictionary
# from sqlalchemy.ext.hybrid import hybrid_property

USERNAME_PSQL = config('USERNAME_PSQL', default='')
PASSWORD_PSQL = config('PASSWORD_PSQL', default='')
DB_NAME_PSQL = config('DB_NAME_PSQL', default='')
DB_PORT_PSQL = config('DB_PORT_PSQL', default='')
DB_HOST_PSQL = config('DB_HOST_PSQL', default='')
   
# #create application
app = Flask(__name__)

#fetch all data once instead of at every search invoke
# hikes = []

#establish a connection
engine = create_engine('postgresql+psycopg2://{}:{}@{}/{}'.format(USERNAME_PSQL, PASSWORD_PSQL, 
                                                                  DB_HOST_PSQL, DB_NAME_PSQL))
#start a session
Session = sessionmaker(bind=engine)
session = Session()

# # Write queries here
# new_hike = Hike(name="TEST", description="TEST TEST HIKE HIKE HIKE",
#                 city="NYC", country="USA", latitude=-0.555, longitude=-0.0)

# session.add(new_hike)
# #commit changes
# session.commit()

# hikes = session.query(Hike).all()

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

