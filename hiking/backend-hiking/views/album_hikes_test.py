import datetime
import json
import collections
import webtest
import pytest

from database import Session
import test_base
from models.album_hikes_model import Album_Hikes

class AlbumHikesTest(test_base.TestBase):
    def assert_response(self, response, expected_album_hikes):
        """
        A helper method that asserts whether an HTTP Response includes the suspected ALbum_Hikes IDs.
        """
        actual_ids = [int(collection["album_id"]) for collection in response]
        expected_ids = [int(collection.album_id) for collection in expected_album_hikes]
        self.assertCountEqual(expected_ids, actual_ids)

    # Commneted out tests work, butthey are connected to the actual database and return Violated Constraints error
    # because the unit tests connect to the actual database 
    
    #Test check if we can access  hikes in an album given an album id, if there is only one hike
    def test_get_all_only_one_hike_in_album(self):
        # Instantiate an Album_Hikes object.
        album_hikes = Album_Hikes(
            hike_api_id=234,
            hike_id="234-543-345",
            album_id="1234567890",
        )

        with self.app.app_context():

            session = Session()
            existing_hike = session.query(Album_Hikes).filter_by(hike_api_id=234).delete()
            session.commit()    
            session.close()

            # Add all Actor to the database and commit the transaction.
            session = Session()
            session.add(album_hikes)
            session.commit()
    

            response = self.webtest_app.get("/album_hikes/get_all", params={'album_id': '1234567890'}).json
            # Assert the expect and actual response sizes are equal.
            self.assertEqual(len(response), len([album_hikes]))
            # Assert the response only includes the expected album_hikes IDs.
            self.assert_response(response, [album_hikes])

    #Test check if we can access multiple hikes in an album given an album id, if there are multiple hikes
    def test_get_all_many_hikes_in_album(self):
        # Instantiate an Album_Hikes object.
        album_hikes1 = Album_Hikes(
            hike_api_id=234,
            hike_id="234-543-345",
            album_id="1234567890",
        )

       # Instantiate an Album_Hikes object.
        album_hikes2 = Album_Hikes(
            hike_api_id=235,
            hike_id="234-543-345-897",
            album_id="12345678901234",
        )
        album_hikes = [album_hikes1, album_hikes2]

        TestCase = collections.namedtuple(
        "TestCase", ["name", "request_url", "album_id", "expected_album_hikes"]
        )

        # Initialize the various test cases we are interested in testing.
        test_cases = [
            TestCase(
                name="retrieve album_hikes 1",
                request_url="/album_hikes/get_all",
                album_id=album_hikes1.album_id,
                expected_album_hikes=[album_hikes1],
            ),
            TestCase(
                name="retrieve album_hikes 2",
                request_url="/album_hikes/get_all",
                album_id=album_hikes2.album_id,
                expected_album_hikes=[album_hikes2],
            ),
            ]

        with self.app.app_context():

            session = Session()
            for hikes in album_hikes:
                session.query(Album_Hikes).filter_by(hike_api_id=hikes.hike_api_id).delete()
                session.query(Album_Hikes).filter_by(hike_api_id=hikes.hike_api_id).delete()
            session.commit()    
            session.close()

            session = Session()
            # Add all album_hikes to the database and commit the transaction.
            session.add_all(album_hikes)
            session.commit()

            for test_case in test_cases:
                with self.subTest(msg=test_case.name):
                    response = self.webtest_app.get(test_case.request_url, params={'album_id': test_case.album_id}).json
                    # Assert the expect and actual response sizes are equal.
                    self.assertEqual(len(response), len(test_case.expected_album_hikes))
                    # Assert the response only includes the expected Album_Hikes IDs.
                    self.assert_response(response, test_case.expected_album_hikes)

    # Test that we cannot add a hike to an album, if any of the required fields 
    # album_id, hike_id, and hike_api_id
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
                request_body={"hike_id":"1234", "hike_api_id":123},
                expected_error_code="400",
                expected_error_message="album_id cannot be blank.",
            ),
            TestCase(
                name="missing hike_id",
                request_body={"album_id":"1234", "hike_api_id":123},
                expected_error_code="400",
                expected_error_message="hike_id cannot be blank.",
            ),
            TestCase(
                name="missing hike_api_id",
                request_body={"hike_id":"1234", "album_id":"123"},
                expected_error_code="400",
                expected_error_message="hike_api_id cannot be blank.",
            ),
        ]
        with self.app.app_context():
            for test_case in test_cases:
                with self.subTest(msg=test_case.name):
                    # Assert validation errors are raised for the test cases defined above.
                    with self.assertRaises(webtest.AppError) as exception:
                        self.webtest_app.post_json("/album_hikes/add_hike_to_album", test_case.request_body)

                    # Assert the HTTP Response Code and the error messages are what we expect.
                    _, response_body = str(exception.exception).split("\n")
                    print("Response Body:", response_body)
                    self.assertTrue(test_case.expected_error_code in response_body)
                    self.assertTrue(test_case.expected_error_message in response_body)

    # Test that we can add a hike to an album, given album_id, hike_id, and hike_api_id
    def test_add_hike_to_album(self):
        # Instantiate request payload.
        request_body = {
            "hike_id": "1234-5667",
            "hike_api_id":1234,
            "album_id": "12345678-des-45",
        }

        with self.app.app_context():

            session = Session()
            existing_hike = session.query(Album_Hikes).filter_by(hike_api_id=1234).delete()
            session.commit()    
            session.close()

            # Send an HTTP Post Request to "album_hikes/add_hike_to_album".
            response = self.webtest_app.post_json("/album_hikes/add_hike_to_album", request_body).json
            # Assert various aspects of the response object.
            self.assertEqual(response["hike_id"], "1234-5667")
            self.assertEqual(response["hike_api_id"], 1234)
            self.assertEqual(response["album_id"], "12345678-des-45")