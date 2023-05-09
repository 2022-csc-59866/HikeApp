import flask
from flask import request, jsonify

# import database
from database import Session
from services.serialize_util import serialize_sqlalchemy_objects_to_dictionary
from models.users_model import User

blueprint = flask.Blueprint("users", __name__)

@blueprint.route("/get_user_info", methods=["GET"])
def get_user_info():
    print("inside get_user_info()")
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

    session = Session()
    user_info = session.query(User).filter_by(cookie=params["user_id"]).all()
    session.close()
    print(user_info)

    return jsonify(serialize_sqlalchemy_objects_to_dictionary(user_info))