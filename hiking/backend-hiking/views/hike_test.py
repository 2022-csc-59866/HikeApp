import collections
import webtest
import pytest

from database import Session
import test_base
from models.hike_model import Hike

class AlbumHikesTest(test_base.TestBase):
    def assert_response(self, response, expected_hikes):
        """
        A helper method that asserts whether an HTTP Response includes the suspected Hike IDs.
        """
        actual_ids = [collection["id"] for collection in response]
        expected_ids = [collection.id for collection in expected_hikes]
        self.assertCountEqual(expected_ids, actual_ids)

    # Commneted out tests work, butthey are connected to the actual database and return Violated Constraints error
    # because the unit tests connect to the actual database 

    #Test check if we can GET all hikes in database
    # def test_get_all_hikes(self):
    #     # Instantiate an Hike object.
    #     hike = Hike(
    #         api_id=3453, 
    #         name="100 Lakes",
    #         length="6.0",
    #         longitude="123",
    #         latitude="123",
    #         id="12345532",
    #         city=None, 
    #         state=None,
    #         country=None,
    #         description=None,
    #         thumbnail=None
    #     )

    #     with self.app.app_context():
    #         # Add Hike to the database and commit the transaction.
    #         session = Session()
    #         session.add(hike)
    #         session.commit()
    #         response = self.webtest_app.get("/hike/search").json
    #         # Assert the expect and actual response sizes are equal.
    #         self.assertEqual(len(response), len([hike]))
    #         # Assert the response only includes the expected hike IDs.
    #         self.assert_response(response, [hike])

    # #Test check if we can access multiple hikes in an album given an album id, if there are multiple hikes
    # def test_get_all_hikes_multiple(self):
    #     # Instantiate an Hike object.
    #     hike1 = Hike(
    #         api_id=123, 
    #         name="100 Lakes",
    #         length="6.0",
    #         longitude="123",
    #         latitude="123",
    #         id="12345-532",
    #         city=None, 
    #         state=None,
    #         country=None,
    #         description=None,
    #         thumbnail=None
    #     )

    #     # Instantiate an Hike object.
    #     hike2 = Hike(
    #         api_id=11223, 
    #         name="100 Lakes Loop",
    #         length="6.0",
    #         longitude="123",
    #         latitude="123",
    #         id="12345-5323-241f",
    #         city=None, 
    #         state=None,
    #         country=None,
    #         description=None,
    #         thumbnail=None
    #     )

    #     hikes = [hike1, hike2]

    #     TestCase = collections.namedtuple(
    #     "TestCase", ["name", "request_url", "expected_hikes"]
    #     )

    #     # Initialize the various test cases we are interested in testing.
    #     test_cases = [
    #         TestCase(
    #             name="retrieve hikes 1",
    #             request_url="/hike/search",
    #             expected_hikes=[hike1],
    #         ),
    #         TestCase(
    #             name="retrieve hikes 2",
    #             request_url="/hike/search",
    #             expected_hikes=[hike2],
    #         ),
    #         ]

    #     with self.app.app_context():
    #         session = Session()
    #         # Add all Hikes to the database and commit the transaction.
    #         session.add_all(hikes)
    #         session.commit()

    #         for test_case in test_cases:
    #             with self.subTest(msg=test_case.name):
    #                 response = self.webtest_app.get(test_case.request_url).json
    #                 # Assert the expect and actual response sizes are equal.
    #                 self.assertEqual(len(response), len(test_case.expected_hikes))
    #                 # Assert the response only includes the expected Hikes IDs.
    #                 self.assert_response(response, test_case.expected_hikes)

    # Test that we cannot add a hike to db, if any of the required fields 
    # "api_id", "name", "id"
    # are missing
    def test_add_hike_bad_request(self):
        # Define a TestCase named tuple to simplify the construction of test cases.
        TestCase = collections.namedtuple(
            "TestCase",
            ["name", "request_body", "expected_error_code", "expected_error_message"],
        )
        # Initialize the various test cases we are interested in testing.
        test_cases = [
            TestCase(
                name="missing api_id",
                request_body={"id":"1234", "name":"100 Lakes"},
                expected_error_code="400",
                expected_error_message="api_id cannot be blank.",
            ),
            TestCase(
                name="missing id",
                request_body={"id":"1234", "hike_api_id":123},
                expected_error_code="400",
                expected_error_message="id cannot be blank.",
            ),
            TestCase(
                name="missing name",
                request_body={"hike_id":"1234", "api_id":123},
                expected_error_code="400",
                expected_error_message="name cannot be blank.",
            ),
        ]
        with self.app.app_context():
            for test_case in test_cases:
                with self.subTest(msg=test_case.name):
                    # Assert validation errors are raised for the test cases defined above.
                    with self.assertRaises(webtest.AppError) as exception:
                        self.webtest_app.post_json("/hike/save_hike", test_case.request_body)

                    # Assert the HTTP Response Code and the error messages are what we expect.
                    _, response_body = str(exception.exception).split("\n")
                    print("Response Body:", response_body)
                    self.assertTrue(test_case.expected_error_code in response_body)
                    self.assertTrue(test_case.expected_error_message in response_body)

    # # Test that we can add a hike to an album, given id, name, and api_id
    # def test_add_hike_to_album(self):
    #     # Instantiate request payload.
    #     request_body = {
    #         "id": "1234-5667",
    #         "api_id":1234,
    #         "name": "100 Lakes",
    #     }

    #     with self.app.app_context():
    #         # Send an HTTP Post Request to "hikes/save_hike".
    #         response = self.webtest_app.post_json("/hike/save_hike", request_body).json
    #         # Assert various aspects of the response object.
    #         self.assertEqual(response["id"], "1234-5667")
    #         self.assertEqual(response["api_id"], 1234)
    #         self.assertEqual(response["name"], "100 Lakes")