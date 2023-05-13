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
     
    # #Test check if we can access  all albums given user ID
    # def test_get_user_albums(self):
    #     # Instantiate an User_Albums object.
    #     user_albums = User_Albums(
    #         user_id="1134542-2453",
    #         album_id="14ffser-2312",
    #         album_name = "My Album",
    #         album_type="CUSTOM"
    #     )

    #     with self.app.app_context():
    #         # Add all Actor to the database and commit the transaction.
    #         session = Session()
    #         session.add(user_albums)
    #         session.commit()
    #         response = self.webtest_app.get("/user_albums/get_all_albums", params={'user_id': "1134542-2453"}).json
    #         # Assert the expect and actual response sizes are equal.
    #         self.assertEqual(len(response), len([user_albums]))
    #         # Assert the response only includes the expected user_albums IDs.
    #         self.assert_response(response, [user_albums])

    # #Test check if we can access all albums info given user ID
    # def test_get_all_many_hikes_in_album(self):

    #     # Instantiate an User_Albums object.
    #     user_album1 = User_Albums(
    #         user_id="1134542-2453",
    #         album_id="14ffser-2312",
    #         album_name = "My Album",
    #         album_type="CUSTOM"
    #     )

    #     # Instantiate an User_Albums object.
    #     user_album2 = User_Albums(
    #         user_id="1134542-2453",
    #         album_id="14ffser-2113312",
    #         album_name = "My Second Album",
    #         album_type="CUSTOM"
    #     )
    #     user_albums = [user_album1, user_album2]

    #     TestCase = collections.namedtuple(
    #     "TestCase", ["name", "request_url", "user_id", "expected_user_albums"]
    #     )

    #     # Initialize the various test cases we are interested in testing.
    #     test_cases = [
    #         TestCase(
    #             name="retrieve album 1 for user",
    #             request_url="/user_albums/get_all_albums",
    #             user_id=user_album1.album_id,
    #             expected_user_albums=[user_album1],
    #         ),
    #         TestCase(
    #             name="retrieve album 2 for user",
    #             request_url="/user_albums/get_all_albums",
    #             user_id=user_album2.album_id,
    #             expected_user_albums=[user_album2],
    #         ),
    #         ]

    #     with self.app.app_context():
    #         session = Session()
    #         # Add all user_albums to the database and commit the transaction.
    #         session.add_all(user_albums)
    #         session.commit()

    #         for test_case in test_cases:
    #             with self.subTest(msg=test_case.name):
    #                 response = self.webtest_app.get(test_case.request_url, params={'album_id': test_case.album_id}).json
    #                 # Assert the expect and actual response sizes are equal.
    #                 self.assertEqual(len(response), len(test_case.expected_user_albums))
    #                 # Assert the response only includes the expected User_albums IDs.
    #                 self.assert_response(response, test_case.expected_user_albums)

    # #Test check if we can access all album info given album ID
    # def test_get_all_many_hikes_in_album(self):

    #     # Instantiate an User_Albums object.
    #     user_album1 = User_Albums(
    #         user_id="1134542-2453",
    #         album_id="14ffser-2312",
    #         album_name = "My Album",
    #         album_type="CUSTOM"
    #     )

    #     # Instantiate an User_Albums object.
    #     user_album2 = User_Albums(
    #         user_id="1134542-2453",
    #         album_id="14ffser-2113312",
    #         album_name = "My Second Album",
    #         album_type="CUSTOM"
    #     )
    #     user_albums = [user_album1, user_album2]

    #     TestCase = collections.namedtuple(
    #     "TestCase", ["name", "request_url", "album_id", "expected_user_albums"]
    #     )

    #     # Initialize the various test cases we are interested in testing.
    #     test_cases = [
    #         TestCase(
    #             name="retrieve album 1 for user",
    #             request_url="/user_albums/get_album_info",
    #             album_id=user_album1.album_id,
    #             expected_user_albums=[user_album1],
    #         ),
    #         TestCase(
    #             name="retrieve album 2 for user",
    #             request_url="/user_albums/get_album_info",
    #             album_id=user_album2.album_id,
    #             expected_user_albums=[user_album2],
    #         ),
    #         ]

    #     with self.app.app_context():
    #         session = Session()
    #         # Add all user_albums to the database and commit the transaction.
    #         session.add_all(user_albums)
    #         session.commit()

    #         for test_case in test_cases:
    #             with self.subTest(msg=test_case.name):
    #                 response = self.webtest_app.get(test_case.request_url, params={'album_id': test_case.album_id}).json
    #                 # Assert the expect and actual response sizes are equal.
    #                 self.assertEqual(len(response), len(test_case.expected_user_albums))
    #                 # Assert the response only includes the expected User_albums IDs.
    #                 self.assert_response(response, test_case.expected_user_albums)


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

    # # Test that we can add an empty user album, given "album_name", "user_id", "album_id"
    # def test_add_hike_to_album(self):
    #     # Instantiate request payload.
    #     request_body = {
    #         "user_id": "1234-5667",
    #         "album_name":"My first album",
    #         "album_id": "12345678-des-45",
    #         "album_type":"CUSTOM"
    #     }

    #     with self.app.app_context():
    #         # Send an HTTP Post Request to "/user_albums/create_custom_empty"
    #         response = self.webtest_app.post_json("/user_albums/create_custom_empty", request_body).json
    #         # Assert various aspects of the response object.
    #         self.assertEqual(response["user_id"], "1234-5667")
    #         self.assertEqual(response["album_name"], "My first album")
    #         self.assertEqual(response["album_id"], "12345678-des-45")
    #         self.assertEqual(response["album_type"].to_json(), AlbumType.CUSTOM.to_json())