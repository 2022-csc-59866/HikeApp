import flask
from flask import request, jsonify

import database
from services.serialize_util import serialize_sqlalchemy_objects_to_dictionary
from models.user_albums_model import User_Albums

# Initialize the authentication blueprint.
blueprint = flask.Blueprint("user_albums", __name__)

@blueprint.route("/get_all_albums", methods=["GET"])
def get_albums_for_user():
    print("inside get_albums_for_user()")
    # print(dir(flask.request))
    print(flask.request.args)

    # Parse the JSON data in the request's body.
    params = flask.request.args
    # # Validate that the client provided all required fields.
    required_fields = ["user_id"]

    for field in required_fields:
        # If a required field is missing, return a 400 (Bad Request) HTTP
        # Status Code to clients, signifying that we received a bad request.
        if field not in params:
            flask.abort(400, description=f"{field} cannot be blank.")

    albums_for_user = database.session.query(User_Albums).filter_by(user_id=params["user_id"]).all()

    return jsonify(serialize_sqlalchemy_objects_to_dictionary(albums_for_user))

@blueprint.route("/create_custom_empty", methods=["POST"])
def create_custom_empty_album():
    # Parse the JSON data in the request's body.
    album_data = flask.request.get_json()
    # Validate that the client provided all required fields.
    required_fields = ["album_name", "user_id", "album_id"]
    for field in required_fields:
        # If a required field is missing, return a 400 (Bad Request) HTTP
        # Status Code to clients, signifying that we received a bad request.
        if field not in album_data:
            flask.abort(400, description=f"{field} cannot be blank.")

    # Initialize and populate an Album object with the data submitted by the client.
    album = User_Albums(album_id=album_data["album_id"], 
                user_id=album_data["user_id"],
                album_type=album_data["album_type"], 
                album_name=album_data["album_name"], )
    # Add the Album to the database and commit the transaction.
    database.session.add(album)
    database.session.commit()

    return flask.jsonify(
        {
            "user_id": album.user_id,
            "album_name": album.album_name,
            "album_id": album.album_id,
            "album_type": album.album_type.to_json(),
        }
    )