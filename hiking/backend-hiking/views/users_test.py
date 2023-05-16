import datetime
import json
import collections
import webtest
import pytest

from database import Session
import test_base
from models.users_model import User

class UsersTest(test_base.TestBase):
    def assert_response(self, response, expected_users):
        """
        A helper method that asserts whether an HTTP Response includes the suspected user id (cookie).
        """
        actual_ids = [collection["cookie"] for collection in response]
        expected_ids = [collection.cookie for collection in expected_users]
        self.assertCountEqual(expected_ids, actual_ids)

    
    #Test check if we can access  hikes in an album given an album id, if there is only one hike
    def test_get_user_info(self):
        # Instantiate an Users object.
        user = User(
            first_name="John",
            middle_name="",
            last_name="Doe",
            email="jd-test@gmail.com",
            password="test",
            cookie="1233fskdkb", #user_id
            avatar_url="avatar.jpg"
        )

        with self.app.app_context():

            session = Session()
            existing_user = session.query(User).filter_by(cookie="1233fskdkb").delete()
            session.commit()    
            session.close()

            # Add all Actor to the database and commit the transaction.
            session = Session()
            session.add(user)
            session.commit()
    

            response = self.webtest_app.get("/users/get_user_info", params={"user_id":"1233fskdkb"}).json
            # Assert the expect and actual response sizes are equal.
            self.assertEqual(len(response), len([user]))
            # Assert the response only includes the expected user email.
            self.assert_response(response, [user])