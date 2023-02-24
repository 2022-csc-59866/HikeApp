# python -m flask run --host=0.0.0.0
from flask import Flask
import psycopg2
from decouple import config
from flask import Flask, request
from sqlalchemy import create_engine, Column, String, Integer, DateTime, Float
from sqlalchemy.orm import sessionmaker #, relationship, backref
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base
from models.hike_model import Hike
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

# Write queries here
new_hike = Hike(name="TEST", description="TEST TEST HIKE HIKE",
                city="NYC", country="USA", latitude=-0.2, longitude=-0.0)

session.add(new_hike)
#commit changes
session.commit()

hikes = session.query(Hike).all()

#close session
session.close()

for hike in hikes:
    print(str(hike.name) + " ")
    print(str(hike.description) + " ")
    print(str(hike.city) + " ")
    print(str(hike.state) + " ")
    print(str(hike.country) + " ")
    print(str(hike.latitude) + " ")
    print(str(hike.longitude) + "\n")

@app.route("/search", methods=["GET"])
def search():
    pass
    # #check if limit is provided and valid
    # limit = 10
    # if "limit" in request.args:
    #     try:
    #         limit = int(request.args["limit"])
    #     except ValueError:
    #         print("Limit provided not an integer. Custom limit ignored.")

    # # process arguments
    # hikes_filtered = []
    # for hike in hikes:
    #     #check all filters
    #     hikes_filtered.append(hike)

    #     #check for limit, if reached, break early
    #     if len(hikes_filtered) >= int(limit):
    #         break

    # return hikes_filtered

if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)
