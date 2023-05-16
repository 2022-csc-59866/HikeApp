import collections
import webtest
import pytest

from database import Session
import test_base
from models.user_albums_model import User_Albums
from models.album_type import AlbumType


class UserAlbumsTest(test_base.TestBase):
    def assert_response(self, response, expected_user_albums):
        """
        A helper method that asserts whether an HTTP Response includes the suspected albums IDs.
        """
        actual_ids = [collection["album_id"] for collection in response]
        expected_ids = [collection.album_id for collection in expected_user_albums]
        self.assertCountEqual(expected_ids, actual_ids)

    # Commneted out tests work, butthey are connected to the actual database and return Violated Constraints error
    # because the unit tests connect to the actual database 
     
    #Test check if we can access  all albums given album ID
    def test_get_user_albums(self):
        # Instantiate an User_Albums object.
        user_albums = User_Albums(
            user_id="1134542-2453",
            album_id="14ffser-2312",
            album_name = "My Album",
            album_type="CUSTOM"
        )

        with self.app.app_context():
            
            session = Session()

            # Delete the entry if it exists.
            session.query(User_Albums).filter_by(album_id="14ffser-2312").delete()
            session.commit()

            # Add the user_albums to the session and commit the transaction.
            session.add(user_albums)
            session.commit()

            response = self.webtest_app.get("/user_albums/get_all_albums", params={"user_id": "1134542-2453"}).json
            # Assert the expect and actual response sizes are equal.
            self.assertEqual(len(response), len([user_albums]))
            # Assert the response only includes the expected user_albums IDs.
            self.assert_response(response, [user_albums])


    # Test that we cannot add an empty album, if any of the required fields 
    # "album_name", "user_id", "album_id"
    # are missing
    def test_add_hike_to_album_bad_request(self):
        # Define a TestCase named tuple to simplify the construction of test cases.
        TestCase = collections.namedtuple(
            "TestCase",
            ["name", "request_body", "expected_error_code", "expected_error_message"],
        )
        # Initialize the various test cases we are interested in testing.
        test_cases = [
            TestCase(
                name="missing album_id",
                request_body={"user_id":"1234", "album_name":"My first album"},
                expected_error_code="400",
                expected_error_message="album_id cannot be blank.",
            ),
            TestCase(
                name="missing user_id",
                request_body={"album_id":"1234", "album_name":"My first album"},
                expected_error_code="400",
                expected_error_message="user_id cannot be blank.",
            ),
            TestCase(
                name="missing album_name",
                request_body={"user_id":"1234", "album_id":"123"},
                expected_error_code="400",
                expected_error_message="album_name cannot be blank.",
            ),
        ]
        with self.app.app_context():
            for test_case in test_cases:
                with self.subTest(msg=test_case.name):
                    # Assert validation errors are raised for the test cases defined above.
                    with self.assertRaises(webtest.AppError) as exception:
                        self.webtest_app.post_json("/user_albums/create_custom_empty", test_case.request_body)

                    # Assert the HTTP Response Code and the error messages are what we expect.
                    _, response_body = str(exception.exception).split("\n")
                    print("Response Body:", response_body)
                    self.assertTrue(test_case.expected_error_code in response_body)
                    self.assertTrue(test_case.expected_error_message in response_body)

    # Test that we can add an empty user album, given "album_name", "user_id", "album_id"
    def test_add_hike_to_album(self):
        # Instantiate request payload.
        request_body = {
            "user_id": "1234-5667",
            "album_name":"My first album",
            "album_id": "12345678-des-45",
            "album_type":"CUSTOM"
        }

        with self.app.app_context():

            session = Session()
            # Delete the entry if it exists.
            existing_album = session.query(User_Albums).filter_by(album_id="12345678-des-45").delete()
            session.commit()    
            session.close()

            # Send an HTTP Post Request to "/user_albums/create_custom_empty"
            response = self.webtest_app.post_json("/user_albums/create_custom_empty", request_body).json
            # Assert various aspects of the response object.
            self.assertEqual(response["user_id"], "1234-5667")
            self.assertEqual(response["album_name"], "My first album")
            self.assertEqual(response["album_id"], "12345678-des-45")
            self.assertEqual(response["album_type"], AlbumType.CUSTOM.to_json())