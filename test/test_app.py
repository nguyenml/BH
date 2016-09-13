import os
import unittest

from flask import Flask

from src.app import app
from src.models import db

from test import EXISTING_USER

import unittest 

class TestCase(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite://' 
        self.app = app.test_client()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def login(self, un=EXISTING_USER['email'],
                    pw=EXISTING_USER['password'],
                    pn=EXISTING_USER['penname']):
        return self.app.post('/login', data={'email': un,
                                            'password': pw,
                                            'penname': pn },
                                        follow_redirects=True)

    # Routing Tests (Not Logged In)

    def test_landing(self):
        result = self.app.get('/') 
        self.assertEqual(result.status_code, 200)

    def test_tavern(self):
        result = self.app.get('/tavern') 
        self.assertEqual(result.status_code, 401)
    
    def test_reading(self):
        result = self.app.get('/reading') 
        self.assertEqual(result.status_code, 401)

    def test_user(self):
        result = self.app.get('/user') 
        self.assertEqual(result.status_code, 401)

    def test_writing(self):
        result = self.app.get('/writing') 
        self.assertEqual(result.status_code, 401)

    # Routes (logged in)


    # Form Tests

    def test_not_matching_password_signup(self):
        data = {"email": "testfailpassword@test.com",
                "firstname": "tester",
                "lastname": "tester",
                "password": "1",
                "confirmpassword": "2"}
        result = self.app.post("/createaccount", data=data, follow_redirects=True)

    def test_already_used_email_signup(self):
        result = self.app.post('/createaccount', data=EXISTING_USER, follow_redirects=True)
        result = self.app.post('/createaccount', data=EXISTING_USER, follow_redirects=True)

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

    def test_password_change(self):
        pass

    def test_email_change_to_used_email(self):
        pass

    def test_email_change(self):
        pass

    # Writing Page Tests

    # Reading Page Tests

    # Dashboard Page Tests

    # User Page Tests


