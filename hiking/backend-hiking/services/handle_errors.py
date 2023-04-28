import typing
import flask


def bad_request(error: typing.Any) -> flask.Response:
    """
    An attachable helper function that indends to standarize the response
    clients receive whenever we respond with an HTTP Status Code of 400
    (Bad Request).
    """
    return (
        flask.jsonify(
            error={
                "code": error.code,
                "name": error.name,
                "description": error.description,
            }
        ),
        400,
    )


def unauthorized(error: typing.Any) -> flask.Response:
    """
    An attachable helper function that indends to standarize the response
    clients receive whenever we respond with an HTTP Status Code of 401
    (Unauthorized).
    """
    return (
        flask.jsonify(
            error={
                "code": error.code,
                "name": error.name,
                "description": error.description,
            }
        ),
        401,
    )


def resource_not_found(error: typing.Any) -> flask.Response:
    """
    An attachable helper function that indends to standarize the response
    clients receive whenever we respond with an HTTP Status Code of 404
    (Not Found).
    """
    return (
        flask.jsonify(
            error={
                "code": error.code,
                "name": error.name,
                "description": error.description,
            }
        ),
        404,
    )