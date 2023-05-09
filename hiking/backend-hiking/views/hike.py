import flask
from flask import request, jsonify
from database import Session

from services.serialize_util import serialize_sqlalchemy_objects_to_dictionary
from models.hike_model import Hike

# Initialize the authentication blueprint.
blueprint = flask.Blueprint("hike", __name__)

@blueprint.route("/search", methods=["GET"])
def search():
    limit = 10
    if limit in request.args:
        limit = request.args["limit"]

    session = Session()
    hikes = session.query(Hike).limit(limit).all()
    session.close()
    
    return jsonify(serialize_sqlalchemy_objects_to_dictionary(hikes))