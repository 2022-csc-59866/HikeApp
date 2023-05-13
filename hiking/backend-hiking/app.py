# python -m flask run --host=0.0.0.0
import os
import flask
from flask import Flask, jsonify, request
from flask_session import Session

import secrets
import database
import configuration
import login_manager

from views.authentication import blueprint as auth_blueprint
from views.hike import blueprint as hike_blueprint
from views.album_hikes import blueprint as album_hikes_blueprint
from views.user_albums import blueprint as user_albums_blueprint
from views.users import blueprint as users_blueprint
from services.handle_errors import bad_request, resource_not_found, unauthorized

def create_app(configuration_name: configuration.ConfigurationName) -> flask.app.Flask:
    """
    A factory function designed to create a Flask Application.
    """

    # Initialize the Flask Application.
    app = flask.Flask(__name__)

    #add various app configs so that there are no RuntimeErrors from login_mnager
    #secret_key is always different, potentially may be an issue with logged sessions
    app.secret_key = secrets.token_hex(16)
    app.config['SESSION_COOKIE_SECURE'] = False
    app.config['SESSION_TYPE'] = "filesystem"
    app.session_cookie_name = "session cookie"

    #create flask session
    sess = Session()
    sess.init_app(app)

    # Load the configuration pertaining to the environment you're in
    # e.g., development, production, or testing.
    app.config.from_object(configuration.configuration[configuration_name])

    # Initialize the session manager within the instance of the application.
    # The session manager is covered in detail here: https://flask-login.readthedocs.io/en/latest/
    login_manager.login_manager.init_app(app)

    # Rules that end with a slash are “branches”, others are “leaves”.
    # If strict_slashes is enabled (the default), visiting a branch URL without a
    # trailing slash will redirect to the URL with a slash appended.
    app.url_map.strict_slashes = False

    # Load the "auth" routes onto the Flask Application. In loading the
    # routes, requests starting with "/auth" will be forwarded to the
    # "auth_blueprint."
    app.register_blueprint(auth_blueprint, url_prefix="/auth")
    app.register_blueprint(hike_blueprint, url_prefix="/hike")
    app.register_blueprint(album_hikes_blueprint, url_prefix="/album_hikes")
    app.register_blueprint(user_albums_blueprint, url_prefix="/user_albums")
    app.register_blueprint(users_blueprint, url_prefix="/users")

    # Register an error handler for 400 (Bad Request). The Flask Application
    # will call the error handler when the application returns a 400
    # HTTP Status Code.
    app.register_error_handler(400, bad_request)
    # Register an error handler for 401 (Unauthorized). The Flask Application
    # will call the error handler when the application returns a 401
    # HTTP Status Code.
    app.register_error_handler(401, bad_request)
    # Register an error handler for 404 (Not Found). The Flask Application
    # will call the error handler when the application returns a 404
    # HTTP Status Code.
    app.register_error_handler(404, resource_not_found)

    @app.teardown_appcontext
    def shutdown_session(exception=None):
        database.session.close()

    return app

if __name__ == "__main__":
    # Retrieve the configuration defined for the environment
    # (development, production, or testing). The environment is set via the
    # "ENVIRONMENT" environment variable. We default to the "DEVELOPMENT"
    # environment if no environment variable is set.
    configuration_name = (
        os.environ.get("ENVIRONMENT") or configuration.ConfigurationName.DEVELOPMENT
    )
    # Validate that the environment value set via the "ENVIRONMENT" environment
    # variable is one that we expect (development, production, or testing).
    if configuration_name not in configuration.configuration:
        raise RuntimeError(
            f'No configuration found for "{configuration_name}" environment.'
        )
    # Create the application using the "create_app" factory function created above.
    app = create_app(configuration_name)
    # Start/Run the application.
    app.run(host="localhost", port=5000, debug=True)


