from src.app import app
from src.models import db, Author

from test.testcase import BaseTestCase

class RoutesTestCase(BaseTestCase):
    # Routing Tests (Not Logged In)

    def test_landing(self):
        result = self.app.get('/')
        self.assertEqual(result.status_code, 200)

    def test_dashboard(self):
        result = self.app.get('/dashboard')
        self.assertEqual(result.status_code, 401)

    def test_reading(self):
        result = self.app.get('/reading')
        self.assertEqual(result.status_code, 401)

    def test_writing(self):
        result = self.app.get('/writing')
        self.assertEqual(result.status_code, 401)

    # Routes (logged in)

    def test_landing_logged_in(self):
        with self.app:
            self.login()
            result = self.app.get('/')
            self.assertEqual(result.status_code, 200)

    def test_dashboard_logged_in(self):
        with self.app:
            self.login()
            result = self.app.get('/dashboard')
            self.assertEqual(result.status_code, 200)

    def test_reading_logged_in(self):
        with self.app:
            self.login()
            result = self.app.get('/reading')
            self.assertEqual(result.status_code, 200)

    def test_writing_logged_in(self):
        with self.app:
            self.login()
            result = self.app.get('/writing')
            self.assertEqual(result.status_code, 200)

    # Form Tests

    def test_not_matching_password_signup(self):
        data = {"email": "testfailpassword@test.com",
                "firstname": "tester",
                "lastname": "tester",
                "password": "1",
                "confirmpassword": "2"}
        result = self.app.post("/createaccount", data=data, follow_redirects=True)

    def test_already_used_email_signup(self):
        result = self.app.post('/createaccount', data=RoutesTestCase.USER, follow_redirects=True)

    # Functionality Tests

    def test_signup(self):
        data = {"email": "testforreal@test.com",
                "firstname": "tester",
                "lastname": "tester",
                "password": "1",
                "confirmpassword": "1"}
        result = self.app.post('/createaccount', data=data, follow_redirects=True)
        self.assertEqual(result.status_code, 200)

    def test_invalid_email_or_password_login(self):
        data = {"email": "nonexistent@non.com",
                "password": "5"}
        result = self.app.post('/login', data=data, follow_redirects=True)

    def test_login(self):
        result = self.login()
        self.assertEqual(result.status_code, 200)

    # Writing Page Tests

    # Reading Page Tests

    # Dashboard Page Tests

    # User Page Tests


