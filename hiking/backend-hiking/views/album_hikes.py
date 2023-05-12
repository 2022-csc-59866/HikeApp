import flask
from flask import request, jsonify

from database import Session
from services.serialize_util import serialize_sqlalchemy_objects_to_dictionary
from models.album_hikes_model import Album_Hikes

blueprint = flask.Blueprint("album_hikes", __name__)

@blueprint.route("/get_all", methods=["GET"])
def get_hikes_in_album():
    print("inside get_hikes")
    print(flask.request.args)

    # Parse the JSON data in the request's body.
    params = flask.request.args
    # # Validate that the client provided all required fields.
    required_fields = ["album_id"]

    for field in required_fields:
        # If a required field is missing, return a 400 (Bad Request) HTTP
        # Status Code to clients, signifying that we received a bad request.
        if field not in params:
            flask.abort(400, description=f"{field} cannot be blank.")

    # hikes_in_album = database.session.query(Album_Hikes).filter_by(album_id=params["album_id"]).all()

    session = Session()
    hikes_in_album = session.query(Album_Hikes).filter_by(album_id=params["album_id"]).all()
    session.close()
    
    return jsonify(serialize_sqlalchemy_objects_to_dictionary(hikes_in_album))


@blueprint.route("/add_hike_to_album", methods=["POST"])
def add_hike_to_album():
    # Parse the JSON data in the request's body.
    hike_data = flask.request.get_json()
    print(flask.request.get_json())
    # Validate that the client provided all required fields.
    required_fields = ["album_id", "hike_api_id", "hike_id"]
    for field in required_fields:
        # If a required field is missing, return a 400 (Bad Request) HTTP
        # Status Code to clients, signifying that we received a bad request.
        if field not in hike_data:
            flask.abort(400, description=f"{field} cannot be blank.")

    # Initialize and populate an Album object with the data submitted by the client.
    hike_in_album = Album_Hikes(album_id=hike_data["album_id"], 
                hike_api_id=hike_data["hike_api_id"],
                hike_id=hike_data["hike_id"], )    
    # Add the Album to the database and commit the transaction.
    session = Session()
    session.add(hike_in_album)
    session.commit()

    return flask.jsonify(
        {
            "album_id": hike_in_album.album_id,
            "hike_id": hike_in_album.hike_id,
            "hike_api_id": hike_in_album.hike_api_id,
        }
    )