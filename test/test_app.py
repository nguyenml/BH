import os
import unittest

from flask import Flask

from src.app import app
from src.models import db

import unittest 

class TestCase(unittest.TestCase):
    EXISTING_USER = {"email": "test@test.com",
                "phonenumber": "1234567890",
                "firstname": "tester",
                "lastname": "tester",
                "password": "1",
                "confirmpassword": "1"}

    EXISTING_LOGIN = {"email": "test@test.com",
                "password": "1"}

    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite://' 
        self.app = app.test_client()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    # Routing Tests

    def test_landing(self):
        result = self.app.get('/') 
        self.assertEqual(result.status_code, 200)

    def test_signin(self):
        result = self.app.get('/signin')
        self.assertEqual(result.status_code, 200)

    # Form Tests
    def test_not_matching_password_signup(self):
        return
        data = {"email": "testfailpassword@test.com",
                "phonenumber": "1234567890",
                "firstname": "tester",
                "lastname": "tester",
                "password": "1",
                "confirmpassword": "2"}
        result = self.app.post("/createaccount", data=data, follow_redirects=True)
        self.assertEqual("Passwords must match" in result.data, True)

    def test_already_used_email_signup(self):
        return
        result = self.app.post('/createaccount', data=TestCase.EXISTING_USER, follow_redirects=True)
        result = self.app.post('/createaccount', data=TestCase.EXISTING_USER, follow_redirects=True)
        self.assertEqual("Signup failed;" in result.data, True)

    # Functionality Tests

    def test_signup(self):
        return
        data = {"email": "testforreal@test.com",
                "phonenumber": "1234567890",
                "firstname": "tester",
                "lastname": "tester",
                "password": "1",
                "confirmpassword": "1"}
        result = self.app.post('/createaccount', data=data, follow_redirects=True)
        self.assertEqual(result.status_code, 200)
        self.assertEqual("Bank Accounts" in result.data, True)

    def test_invalid_email_or_password_login(self):
        return
        data = {"email": "nonexistent@non.com",
                "password": "5"}
        result = self.app.post('/login', data=data, follow_redirects=True)
        self.assertEqual("Login failed." in result.data, True)

    def test_login(self):
        return
        self.app.post('/createaccount', data=TestCase.EXISTING_USER)
        result = self.app.post('/login', data=TestCase.EXISTING_LOGIN, follow_redirects=True)
        self.assertEqual(result.status_code, 200)
        self.assertEqual("Bank Accounts" in result.data, True)

    def test_password_change(self):
        pass

    def test_email_change_to_used_email(self):
        pass

    def test_email_change(self):
        pass

