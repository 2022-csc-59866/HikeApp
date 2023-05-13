import flask
from flask import request, jsonify
from database import Session

from services.serialize_util import serialize_sqlalchemy_objects_to_dictionary
from models.hike_model import Hike

# Initialize the authentication blueprint.
blueprint = flask.Blueprint("hike", __name__)

@blueprint.route("/search", methods=["GET"])
def search():
    session = Session()
    hikes = session.query(Hike).all()
    session.close()
    
    return jsonify(serialize_sqlalchemy_objects_to_dictionary(hikes))

@blueprint.route("/save_hike", methods=["POST"])
def save_hike():
    # Parse the JSON data in the request's body.
    hike_data = flask.request.get_json()
    print(flask.request.get_json())

    # Validate that the client provided all required fields.
    required_fields = ["api_id", "name", "id"]

    for field in required_fields:
        # If a required field is missing, return a 400 (Bad Request) HTTP
        # Status Code to clients, signifying that we received a bad request.
        if field not in hike_data:
            flask.abort(400, description=f"{field} cannot be blank.")

    # Initialize and populate an Album object with the data submitted by the client
    hike = Hike(api_id=hike_data["api_id"], 
                name=hike_data["name"],
                length=hike_data.get("length"),
                longitude=hike_data.get("longitude"),
                latitude=hike_data.get("latitude"),
                city=hike_data.get("city"), 
                state=hike_data.get("state"),
                country=hike_data.get("country"),
                description=hike_data.get("description"),
                id=hike_data["id"],
                thumbnail=hike_data.get("thumbnail"))
    

    # Add the Album to the database and commit the transaction.
    session = Session()
    session.add(hike)
    session.commit()

    return flask.jsonify(
        {
            "api_id": hike.api_id,
            "id": hike.id,
            "name": hike.name,
            "length": hike.length,
            "latitude": hike.latitude,
            "longitude" : hike.longitude,
            "city" : hike.city,
            "state" : hike.state,
            "country" : hike.country,
            "description": hike.description,
            "thumbnail" : hike.thumbnail,
        }
    )